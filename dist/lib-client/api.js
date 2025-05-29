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
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizeRequest = exports.xhr = exports.makeXHRRequestHandler = exports.ServerResponse = void 0;
const shared = require("../lib-shared");
__exportStar(require("../lib-shared/api"), exports);
class ServerResponse {
    constructor(response, collect) {
        this.response = response;
        this.collect = collect;
    }
    status() {
        let status = this.response.status;
        return status !== null && status !== void 0 ? status : 200;
    }
    headers() {
        let headers = this.response.headers;
        return Object.assign({}, headers);
    }
    payload(maxByteLength) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.collectedPayload !== undefined) {
                return this.collectedPayload;
            }
            let payload = this.response.payload;
            let collectedPayload = (this.collect ? yield shared.api.collectPayload(payload, maxByteLength) : payload);
            this.collectedPayload = collectedPayload;
            return collectedPayload;
        });
    }
}
exports.ServerResponse = ServerResponse;
;
function makeXHRRequestHandler(options) {
    let retryAfterTimestamp = Date.now();
    return (raw, clientOptions, requestOptions) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        yield shared.api.createRequestDelay(retryAfterTimestamp - Date.now(), (_a = options === null || options === void 0 ? void 0 : options.maxRequestDelaySeconds) !== null && _a !== void 0 ? _a : 16);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            // @ts-ignore
            let xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onabort = reject;
            xhr.onload = () => {
                var _a;
                let status = xhr.status;
                // Header values for the same header name are joined by he XHR implementation.
                let headers = shared.api.splitHeaders(xhr.getAllResponseHeaders().split("\r\n").slice(0, -1));
                let payload = [new Uint8Array(xhr.response)];
                let raw = {
                    status,
                    headers,
                    payload
                };
                retryAfterTimestamp = (_a = shared.api.parseRetryAfterTimestamp(headers)) !== null && _a !== void 0 ? _a : Date.now();
                resolve(raw);
            };
            if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.onresponseprogess) !== undefined) {
                xhr.onprogress = (event) => {
                    var _a;
                    if (event.lengthComputable) {
                        (_a = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.onresponseprogess) === null || _a === void 0 ? void 0 : _a.call(requestOptions, event.loaded / event.total);
                    }
                };
            }
            if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.onrequestprogress) !== undefined) {
                xhr.upload.onprogress = (event) => {
                    var _a;
                    if (event.lengthComputable) {
                        (_a = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.onrequestprogress) === null || _a === void 0 ? void 0 : _a.call(requestOptions, event.loaded / event.total);
                    }
                };
            }
            let url = (_b = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.urlPrefix) !== null && _b !== void 0 ? _b : "";
            url += shared.api.combineComponents(raw.components);
            url += shared.api.combineParameters(raw.parameters);
            xhr.open(raw.method, url, true);
            xhr.responseType = "arraybuffer";
            for (let header of raw.headers) {
                // Header values for the same header name are joined by he XHR implementation.
                xhr.setRequestHeader(header[0], header[1]);
            }
            xhr.send(yield shared.api.collectPayload(raw.payload));
        }));
    });
}
exports.makeXHRRequestHandler = makeXHRRequestHandler;
;
exports.xhr = makeXHRRequestHandler();
function finalizeRequest(raw, defaultHeaders) {
    let headersToAppend = defaultHeaders.filter((defaultHeader) => {
        let found = raw.headers.find((header) => header[0].toLowerCase() === defaultHeader[0].toLowerCase());
        return found === undefined;
    });
    return Object.assign(Object.assign({}, raw), { headers: [
            ...raw.headers,
            ...headersToAppend
        ] });
}
exports.finalizeRequest = finalizeRequest;
;
