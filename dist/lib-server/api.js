"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeReadStreamResponse = exports.makeDirectoryListing = exports.getContentTypeFromExtension = exports.parseRangeHeader = exports.route = exports.respond = exports.finalizeResponse = exports.acceptsMethod = exports.acceptsComponents = exports.makeNodeRequestHandler = exports.createAuxillary = exports.createRawRequest = exports.combineNodeRawHeaders = exports.DynamicRouteMatcher = exports.StaticRouteMatcher = exports.ClientRequest = exports.EndpointError = void 0;
const libfs = require("fs");
const libhttp = require("http");
const libhttps = require("https");
const libpath = require("path");
const shared = require("../lib-shared");
__exportStar(require("../lib-shared/api"), exports);
class EndpointError {
    constructor(response) {
        this.response = response;
    }
    getResponse() {
        var _a, _b, _c;
        let status = (_a = this.response.status) !== null && _a !== void 0 ? _a : 500;
        let headers = (_b = this.response.headers) !== null && _b !== void 0 ? _b : [];
        let payload = (_c = this.response.payload) !== null && _c !== void 0 ? _c : [];
        return {
            status,
            headers,
            payload
        };
    }
}
exports.EndpointError = EndpointError;
;
class ClientRequest {
    constructor(request, collect, auxillary) {
        this.request = request;
        this.collect = collect;
        this.auxillary = auxillary;
    }
    options() {
        let options = this.request.options;
        return Object.assign({}, options);
    }
    headers() {
        let headers = this.request.headers;
        return Object.assign({}, headers);
    }
    payload(maxByteLength) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.collectedPayload !== undefined) {
                return this.collectedPayload;
            }
            let payload = this.request.payload;
            let collectedPayload = (this.collect ? yield shared.api.collectPayload(payload, maxByteLength) : payload);
            this.collectedPayload = collectedPayload;
            return collectedPayload;
        });
    }
    socket() {
        return this.auxillary.socket;
    }
}
exports.ClientRequest = ClientRequest;
;
;
class StaticRouteMatcher {
    constructor(string) {
        this.string = string;
        this.accepted = false;
    }
    acceptComponent(component, collect = true) {
        if (this.accepted) {
            return false;
        }
        if (component === this.string) {
            if (collect) {
                this.accepted = true;
            }
            return true;
        }
        return false;
    }
    acceptsComponent(component) {
        return this.acceptComponent(component, false);
    }
    getValue() {
        return this.string;
    }
    isSatisfied() {
        return this.accepted;
    }
}
exports.StaticRouteMatcher = StaticRouteMatcher;
;
class DynamicRouteMatcher {
    constructor(minOccurences, maxOccurences, plain, guard) {
        this.minOccurences = minOccurences;
        this.maxOccurences = maxOccurences;
        this.plain = plain;
        this.guard = guard;
        this.values = new Array();
    }
    acceptComponent(component, collect = true) {
        if (this.values.length >= this.maxOccurences) {
            return false;
        }
        try {
            let value = shared.api.deserializeValue(component, this.plain);
            if (this.guard.is(value)) {
                if (collect) {
                    this.values.push(value);
                }
                return true;
            }
        }
        catch (error) { }
        return false;
    }
    acceptsComponent(component) {
        return this.acceptComponent(component, false);
    }
    getValue() {
        if (this.maxOccurences === 1) {
            return this.values[0];
        }
        else {
            return this.values;
        }
    }
    isSatisfied() {
        return this.minOccurences <= this.values.length && this.values.length <= this.maxOccurences;
    }
}
exports.DynamicRouteMatcher = DynamicRouteMatcher;
;
function combineNodeRawHeaders(raw) {
    let headers = new Array();
    for (let i = 0; i < raw.length; i += 2) {
        headers.push(`${raw[i + 0]}: ${raw[i + 1]}`);
    }
    return headers;
}
exports.combineNodeRawHeaders = combineNodeRawHeaders;
;
function createRawRequest(httpRequest, urlPrefix = "") {
    var _a, _b;
    let method = (_a = httpRequest.method) !== null && _a !== void 0 ? _a : "GET";
    let url = (_b = httpRequest.url) !== null && _b !== void 0 ? _b : "";
    if (!url.startsWith(urlPrefix)) {
        throw `Expected url "${url}" to have prefix "${urlPrefix}"!`;
    }
    url = url.slice(urlPrefix.length);
    let components = shared.api.splitComponents(url);
    let parameters = shared.api.splitParameters(url);
    let headers = shared.api.splitHeaders(combineNodeRawHeaders(httpRequest.rawHeaders));
    let payload = {
        [Symbol.asyncIterator]: () => httpRequest[Symbol.asyncIterator]()
    };
    let raw = {
        method,
        components,
        parameters,
        headers,
        payload
    };
    return raw;
}
exports.createRawRequest = createRawRequest;
;
function createAuxillary(httpRequest) {
    let socket = httpRequest.socket;
    let auxillary = {
        socket
    };
    return auxillary;
}
exports.createAuxillary = createAuxillary;
;
function makeNodeRequestHandler(options) {
    return (raw, clientOptions, requestOptions) => {
        var _a;
        let urlPrefix = (_a = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.urlPrefix) !== null && _a !== void 0 ? _a : "";
        let lib = urlPrefix.startsWith("https:") ? libhttps : libhttp;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let payload = yield shared.api.collectPayload(raw.payload);
            let headers = {
                "Content-Length": `${payload.length}`
            };
            for (let header of raw.headers) {
                let key = header[0];
                let value = header[1];
                let values = headers[key];
                if (values === undefined) {
                    headers[key] = value;
                }
                else if (Array.isArray(values)) {
                    values.push(value);
                }
                else {
                    headers[key] = [values, value];
                }
            }
            let url = urlPrefix;
            url += shared.api.combineComponents(raw.components);
            url += shared.api.combineParameters(raw.parameters);
            let request = lib.request(url, Object.assign(Object.assign({}, options), { method: raw.method, headers: headers }), (response) => {
                var _a;
                let status = (_a = response.statusCode) !== null && _a !== void 0 ? _a : 200;
                let headers = shared.api.splitHeaders(combineNodeRawHeaders(response.rawHeaders));
                let payload = {
                    [Symbol.asyncIterator]: () => response[Symbol.asyncIterator]()
                };
                let raw = {
                    status,
                    headers,
                    payload
                };
                resolve(raw);
            });
            request.on("abort", reject);
            request.on("error", reject);
            request.write(payload);
            request.end();
        }));
    };
}
exports.makeNodeRequestHandler = makeNodeRequestHandler;
;
function acceptsComponents(components, matchers) {
    let i = 0;
    for (let component of components) {
        let decoded = decodeURIComponent(component);
        if (decoded === undefined) {
            throw `Expected component to be properly encoded!`;
        }
        let accepted = false;
        for (let matcher of matchers.slice(i)) {
            if (matcher.isSatisfied()) {
                if (!matcher.acceptsComponent(decoded)) {
                    i += 1;
                    continue;
                }
                if (i + 1 < matchers.length) {
                    let next_matcher = matchers[i + 1];
                    if (next_matcher.acceptsComponent(decoded)) {
                        i += 1;
                        continue;
                    }
                }
            }
            if (!matcher.acceptsComponent(decoded)) {
                return false;
            }
            matcher.acceptComponent(decoded);
            accepted = true;
            break;
        }
        if (!accepted) {
            return false;
        }
    }
    if (i !== matchers.length - 1) {
        return false;
    }
    if (!matchers[i].isSatisfied()) {
        return false;
    }
    return true;
}
exports.acceptsComponents = acceptsComponents;
;
function acceptsMethod(one, two) {
    return one === two;
}
exports.acceptsMethod = acceptsMethod;
;
function finalizeResponse(raw, defaultHeaders) {
    return __awaiter(this, void 0, void 0, function* () {
        let payload = raw.payload;
        if (shared.api.SyncBinary.is(payload)) {
            let collectedPayload = yield shared.api.collectPayload(payload);
            defaultHeaders.push(["Content-Length", `${collectedPayload.length}`]);
            payload = [collectedPayload];
        }
        let headersToAppend = defaultHeaders.filter((defaultHeader) => {
            let found = raw.headers.find((header) => header[0].toLowerCase() === defaultHeader[0].toLowerCase());
            return found === undefined;
        });
        return Object.assign(Object.assign({}, raw), { headers: [
                ...raw.headers,
                ...headersToAppend
            ], payload });
    });
}
exports.finalizeResponse = finalizeResponse;
;
function respond(httpResponse, raw, serverOptions) {
    var _a, e_1, _b, _c;
    var _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        let rawHeaders = new Array();
        for (let header of (_d = raw.headers) !== null && _d !== void 0 ? _d : []) {
            rawHeaders.push(...header);
        }
        httpResponse.writeHead((_e = raw.status) !== null && _e !== void 0 ? _e : 200, rawHeaders);
        try {
            for (var _g = true, _h = __asyncValues((_f = raw.payload) !== null && _f !== void 0 ? _f : []), _j; _j = yield _h.next(), _a = _j.done, !_a;) {
                _c = _j.value;
                _g = false;
                try {
                    let chunk = _c;
                    if (!httpResponse.write(chunk)) {
                        yield new Promise((resolve, reject) => {
                            httpResponse.once("drain", resolve);
                        });
                    }
                }
                finally {
                    _g = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = _h.return)) yield _b.call(_h);
            }
            finally { if (e_1) throw e_1.error; }
        }
        httpResponse.end();
        yield new Promise((resolve, reject) => {
            httpResponse.once("finish", resolve);
        });
    });
}
exports.respond = respond;
;
function route(endpoints, httpRequest, httpResponse, serverOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let raw = createRawRequest(httpRequest, serverOptions === null || serverOptions === void 0 ? void 0 : serverOptions.urlPrefix);
            let auxillary = createAuxillary(httpRequest);
            let allEndpoints = endpoints.map((endpoint) => endpoint(raw, auxillary));
            let endpointsAcceptingComponents = allEndpoints.filter((endpoint) => endpoint.acceptsComponents());
            if (endpointsAcceptingComponents.length === 0) {
                return respond(httpResponse, {
                    status: 404
                }, serverOptions);
            }
            let endpointsAcceptingComponentsAndMethod = endpointsAcceptingComponents.filter((endpoint) => endpoint.acceptsMethod());
            if (endpointsAcceptingComponentsAndMethod.length === 0) {
                return respond(httpResponse, {
                    status: 405
                }, serverOptions);
            }
            let endpoint = endpointsAcceptingComponentsAndMethod[0];
            let valid = yield endpoint.validateRequest();
            try {
                let handled = yield valid.handleRequest();
                try {
                    let raw = yield handled.validateResponse();
                    return yield respond(httpResponse, raw, serverOptions);
                }
                catch (error) {
                    return respond(httpResponse, {
                        status: 500,
                        payload: shared.api.serializeStringPayload(String(error))
                    }, serverOptions);
                }
            }
            catch (error) {
                if (typeof error === "number" && Number.isInteger(error) && error >= 100 && error <= 999) {
                    return respond(httpResponse, {
                        status: error
                    }, serverOptions);
                }
                if (error instanceof EndpointError) {
                    let raw = error.getResponse();
                    return respond(httpResponse, raw, serverOptions);
                }
                return respond(httpResponse, {
                    status: 500
                }, serverOptions);
            }
        }
        catch (error) {
            return respond(httpResponse, {
                status: 400,
                payload: shared.api.serializeStringPayload(String(error))
            }, serverOptions);
        }
    });
}
exports.route = route;
;
// TODO: Move to Nexus in v6.
function parseRangeHeader(value, size) {
    var _a, _b, _c;
    if (value === undefined) {
        return {
            status: 200,
            offset: 0,
            length: size,
            size: size
        };
    }
    let s416 = {
        status: 416,
        offset: 0,
        length: 0,
        size: size
    };
    let parts;
    parts = (_a = /^bytes[=]([0-9]+)[-]$/.exec(String(value))) !== null && _a !== void 0 ? _a : undefined;
    if (parts !== undefined) {
        let one = Number.parseInt(parts[1], 10);
        if (one >= size) {
            return s416;
        }
        return {
            status: 206,
            offset: one,
            length: size - one,
            size: size
        };
    }
    parts = (_b = /^bytes[=]([0-9]+)[-]([0-9]+)$/.exec(String(value))) !== null && _b !== void 0 ? _b : undefined;
    if (parts !== undefined) {
        let one = Number.parseInt(parts[1], 10);
        let two = Number.parseInt(parts[2], 10);
        if (two < one) {
            return s416;
        }
        if (one >= size) {
            return s416;
        }
        if (two >= size) {
            two = size - 1;
        }
        return {
            status: 206,
            offset: one,
            length: two - one + 1,
            size: size
        };
    }
    parts = (_c = /^bytes[=][-]([0-9]+)$/.exec(String(value))) !== null && _c !== void 0 ? _c : undefined;
    if (parts !== undefined) {
        let one = Number.parseInt(parts[1], 10);
        if (one < 1) {
            return s416;
        }
        if (size < 1) {
            return s416;
        }
        if (one > size) {
            one = size;
        }
        return {
            status: 206,
            offset: size - one,
            length: one,
            size: size
        };
    }
    return s416;
}
exports.parseRangeHeader = parseRangeHeader;
;
// TODO: Move to Nexus in v6.
function getContentTypeFromExtension(extension) {
    let extensions = {
        ".aac": "audio/aac",
        ".bmp": "image/bmp",
        ".css": "text/css",
        ".csv": "text/csv",
        ".gif": "image/gif",
        ".htm": "text/html",
        ".html": "text/html",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".js": "text/javascript",
        ".json": "application/json",
        ".mid": "audio/midi",
        ".mp3": "audio/mpeg",
        ".mp4": "video/mp4",
        ".otf": "font/otf",
        ".pdf": "application/pdf",
        ".png": "image/png",
        ".svg": "image/svg+xml",
        ".tif": "image/tiff",
        ".tiff": "image/tiff",
        ".ttf": "font/ttf",
        ".txt": "text/plain",
        ".wav": "audio/wav",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".xml": "text/xml"
    };
    return extensions[extension];
}
exports.getContentTypeFromExtension = getContentTypeFromExtension;
;
// TODO: Move to Nexus in v6.
function makeDirectoryListing(pathPrefix, pathSuffix, request) {
    let pathSuffixParts = libpath.normalize(pathSuffix).split(libpath.sep);
    if (pathSuffixParts[0] === "..") {
        throw 400;
    }
    if (pathSuffixParts[pathSuffixParts.length - 1] !== "") {
        pathSuffixParts.push("");
    }
    let fullPath = libpath.join(pathPrefix, ...pathSuffixParts);
    if (!libfs.existsSync(fullPath) || !libfs.statSync(fullPath).isDirectory()) {
        throw 404;
    }
    let directories = [];
    let files = [];
    let entries = libfs.readdirSync(fullPath);
    for (let entry of entries) {
        let stat = libfs.statSync(libpath.join(fullPath, entry));
        if (stat.isDirectory()) {
            directories.push({
                name: entry
            });
            continue;
        }
        if (stat.isFile()) {
            files.push({
                name: entry,
                size: stat.size,
                timestamp: stat.mtime.valueOf()
            });
            continue;
        }
    }
    directories.sort((one, two) => one.name.localeCompare(two.name));
    files.sort((one, two) => one.name.localeCompare(two.name));
    let components = pathSuffixParts;
    return {
        components,
        directories,
        files
    };
}
exports.makeDirectoryListing = makeDirectoryListing;
;
// TODO: Move to Nexus in v6.
function makeReadStreamResponse(pathPrefix, pathSuffix, request) {
    if (libpath.normalize(pathSuffix).split(libpath.sep)[0] === "..") {
        throw 400;
    }
    let path = libpath.join(pathPrefix, pathSuffix);
    while (libfs.existsSync(path) && libfs.statSync(path).isDirectory()) {
        path = libpath.join(path, "index.html");
    }
    if (!libfs.existsSync(path)) {
        throw 404;
    }
    let stat = libfs.statSync(path);
    let range = parseRangeHeader(request.headers().range, stat.size);
    let stream = libfs.createReadStream(path, {
        start: range.offset,
        end: range.offset + range.length
    });
    return {
        status: range.status,
        headers: {
            "Accept-Ranges": "bytes",
            "Content-Length": `${range.length}`,
            "Content-Range": range.length > 0 ? `bytes ${range.offset}-${range.offset + range.length - 1}/${range.size}` : `bytes */${range.size}`,
            "Content-Type": getContentTypeFromExtension(libpath.extname(path)),
            "Last-Modified": stat.mtime.toUTCString()
        },
        payload: stream
    };
}
exports.makeReadStreamResponse = makeReadStreamResponse;
;
