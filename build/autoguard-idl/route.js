"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = exports.Message = exports.Headers = exports.Parameters = exports.Parameter = exports.Alias = exports.Method = exports.Path = exports.Component = exports.Quantifier = void 0;
const is = require("./is");
const tokenization = require("./tokenization");
const types = require("./types");
class Quantifier {
    constructor(kind) {
        this.kind = kind;
    }
    generateSchema(options) {
        if (this.kind === "repeated") {
            return "*";
        }
        if (this.kind === "optional") {
            return "?";
        }
        if (this.kind === "required") {
            return "";
        }
        throw `Expected code to be unreachable!`;
    }
    getMinMax() {
        if (this.kind === "repeated") {
            return { min: 0, max: Infinity };
        }
        if (this.kind === "optional") {
            return { min: 0, max: 1 };
        }
        if (this.kind === "required") {
            return { min: 1, max: 1 };
        }
        throw `Expected code to be unreachable!`;
    }
    static parse(tokenizer) {
        return tokenizer.newContext((read, peek) => {
            var _a, _b;
            if (((_a = peek()) === null || _a === void 0 ? void 0 : _a.family) === "*") {
                tokenization.expect(read(), "*");
                return new Quantifier("repeated");
            }
            if (((_b = peek()) === null || _b === void 0 ? void 0 : _b.family) === "?") {
                tokenization.expect(read(), "?");
                return new Quantifier("optional");
            }
            return new Quantifier("required");
        });
    }
}
exports.Quantifier = Quantifier;
;
class Component {
    constructor(name, quantifier, type) {
        this.name = name;
        this.quantifier = quantifier;
        this.type = type;
    }
    generateSchema(options) {
        if (is.present(this.type)) {
            return "<\"" + this.name + "\"" + this.quantifier.generateSchema(options) + ":" + this.type + ">";
        }
        else {
            return encodeURIComponent(this.name);
        }
    }
    static parse(tokenizer) {
        return tokenizer.newContext((read, peek) => {
            var _a, _b, _c, _d;
            if (((_a = peek()) === null || _a === void 0 ? void 0 : _a.family) === "<") {
                tokenization.expect(read(), "<");
                let token = tokenization.expect(read(), [
                    ...tokenization.IdentifierFamilies,
                    "STRING_LITERAL"
                ]);
                let name = token.family === "STRING_LITERAL" ? token.value.slice(1, -1) : token.value;
                let quantifier = Quantifier.parse(tokenizer);
                let type = types.PlainType.INSTANCE;
                if (((_b = peek()) === null || _b === void 0 ? void 0 : _b.family) === ":") {
                    tokenization.expect(read(), ":");
                    if (((_c = peek()) === null || _c === void 0 ? void 0 : _c.family) === "plain") {
                        tokenization.expect(read(), "plain");
                    }
                    else {
                        type = types.Type.parse(tokenizer);
                        // TODO: Remove compatibility behaviour in v6.
                        if (type === types.StringType.INSTANCE) {
                            type = types.PlainType.INSTANCE;
                        }
                    }
                }
                tokenization.expect(read(), ">");
                return new Component(name, quantifier, type);
            }
            else {
                let name = "";
                if ([...tokenization.IdentifierFamilies, "PATH_COMPONENT"].includes((_d = peek()) === null || _d === void 0 ? void 0 : _d.family)) {
                    let token = tokenization.expect(read(), [
                        ...tokenization.IdentifierFamilies,
                        "PATH_COMPONENT"
                    ]);
                    name = token.family === "PATH_COMPONENT" ? decodeURIComponent(token.value) : token.value;
                }
                return new Component(name, new Quantifier("required"));
            }
        });
    }
}
exports.Component = Component;
;
class Path {
    constructor(components) {
        this.components = components;
    }
    generateSchema(options) {
        let parts = new Array();
        for (let component of this.components) {
            parts.push(component.generateSchema(options));
        }
        return "/" + parts.join("/");
    }
    static parse(tokenizer) {
        return tokenizer.newContext((read, peek) => {
            var _a;
            let components = new Array();
            while (true) {
                tokenization.expect(read(), "/");
                let component = Component.parse(tokenizer);
                components.push(component);
                if (((_a = peek()) === null || _a === void 0 ? void 0 : _a.family) !== "/") {
                    break;
                }
            }
            return new Path(components);
        });
    }
}
exports.Path = Path;
;
class Method {
    constructor(method) {
        this.method = method;
    }
    generateSchema(options) {
        return this.method;
    }
    static parse(tokenizer) {
        return tokenizer.newContext((read, peek) => {
            let method = tokenization.expect(read(), tokenization.IdentifierFamilies).value;
            return new Method(method);
        });
    }
}
exports.Method = Method;
;
class Alias {
    constructor(identifier) {
        this.identifier = identifier;
    }
    generateSchema(options) {
        return this.identifier === "" ? "" : `${this.identifier}():`;
    }
    static parse(tokenizer) {
        return tokenizer.newContext((read, peek) => {
            let identifier = tokenization.expect(read(), tokenization.IdentifierFamilies).value;
            tokenization.expect(read(), "(");
            tokenization.expect(read(), ")");
            tokenization.expect(read(), ":");
            return new Alias(identifier);
        });
    }
}
exports.Alias = Alias;
;
class Parameter {
    constructor(name, quantifier, type) {
        this.name = name;
        this.quantifier = quantifier;
        this.type = type;
    }
    generateSchema(options) {
        return "\"" + this.name + "\"" + this.quantifier.generateSchema(options) + ": " + this.type;
    }
    static parse(tokenizer) {
        return tokenizer.newContext((read, peek) => {
            var _a, _b;
            let token = tokenization.expect(read(), [
                ...tokenization.IdentifierFamilies,
                "STRING_LITERAL"
            ]);
            let name = token.family === "STRING_LITERAL" ? token.value.slice(1, -1) : token.value;
            let quantifier = Quantifier.parse(tokenizer);
            let type = types.PlainType.INSTANCE;
            if (((_a = peek()) === null || _a === void 0 ? void 0 : _a.family) === ":") {
                tokenization.expect(read(), ":");
                if (((_b = peek()) === null || _b === void 0 ? void 0 : _b.family) === "plain") {
                    tokenization.expect(read(), "plain");
                }
                else {
                    type = types.Type.parse(tokenizer);
                    // TODO: Remove compatibility behaviour in v6.
                    if (type === types.StringType.INSTANCE) {
                        type = types.PlainType.INSTANCE;
                    }
                }
            }
            return new Parameter(name, quantifier, type);
        });
    }
}
exports.Parameter = Parameter;
;
class Parameters {
    constructor(parameters) {
        this.parameters = parameters;
    }
    generateSchema(options) {
        if (this.parameters.length === 0) {
            return "";
        }
        let parts = new Array();
        for (let parameter of this.parameters) {
            parts.push(parameter.generateSchema(options));
        }
        return "? <{ " + parts.join(", ") + " }>";
    }
    static parse(tokenizer) {
        return tokenizer.newContext((read, peek) => {
            var _a, _b;
            let parameters = new Array();
            tokenization.expect(read(), "<");
            tokenization.expect(read(), "{");
            while (((_a = peek()) === null || _a === void 0 ? void 0 : _a.family) !== "}") {
                let parameter = Parameter.parse(tokenizer);
                parameters.push(parameter);
                if (((_b = peek()) === null || _b === void 0 ? void 0 : _b.family) === ",") {
                    tokenization.expect(read(), ",");
                }
                else {
                    break;
                }
            }
            tokenization.expect(read(), "}");
            tokenization.expect(read(), ">");
            return new Parameters(parameters);
        });
    }
}
exports.Parameters = Parameters;
;
class Headers {
    constructor(headers) {
        this.headers = headers;
    }
    generateSchema(options) {
        if (this.headers.length === 0) {
            return "";
        }
        let parts = new Array();
        for (let header of this.headers) {
            parts.push(header.generateSchema(options));
        }
        return "<{ " + parts.join(", ") + " }>";
    }
    static parse(tokenizer) {
        return tokenizer.newContext((read, peek) => {
            var _a, _b;
            let headers = new Array();
            tokenization.expect(read(), "<");
            tokenization.expect(read(), "{");
            while (((_a = peek()) === null || _a === void 0 ? void 0 : _a.value) !== "}") {
                let header = Parameter.parse(tokenizer);
                header.name = header.name.toLowerCase();
                headers.push(header);
                if (((_b = peek()) === null || _b === void 0 ? void 0 : _b.family) === ",") {
                    tokenization.expect(read(), ",");
                }
                else {
                    break;
                }
            }
            tokenization.expect(read(), "}");
            tokenization.expect(read(), ">");
            return new Headers(headers);
        });
    }
}
exports.Headers = Headers;
;
class Message {
    constructor(headers, payload) {
        this.headers = headers;
        this.payload = payload;
    }
    generateSchema(options) {
        let lines = new Array();
        let parts = new Array();
        let headers = this.headers.generateSchema(options);
        if (headers !== "") {
            parts.push(headers);
        }
        if (this.payload !== types.UndefinedType.INSTANCE) {
            parts.push(this.payload.generateSchema(options));
        }
        lines.push(parts.join(" "));
        return lines.join(options.eol);
    }
    static parse(tokenizer) {
        return tokenizer.newContext((read, peek) => {
            var _a, _b;
            let headers = new Headers([]);
            if (((_a = peek()) === null || _a === void 0 ? void 0 : _a.family) === "<") {
                headers = Headers.parse(tokenizer);
            }
            let payload = types.UndefinedType.INSTANCE;
            if (((_b = peek()) === null || _b === void 0 ? void 0 : _b.family) === "binary") {
                tokenization.expect(read(), "binary");
                payload = types.Binary.INSTANCE;
            }
            else {
                try {
                    payload = types.Type.parse(tokenizer);
                }
                catch (error) { }
            }
            return new Message(headers, payload);
        });
    }
}
exports.Message = Message;
;
class Route {
    constructor(alias, method, path, parameters, request, response) {
        this.alias = alias;
        this.method = method;
        this.path = path;
        this.parameters = parameters;
        this.request = request;
        this.response = response;
    }
    generateSchema(options) {
        let lines = new Array();
        let parts = new Array();
        parts.push("route");
        parts.push(this.alias.generateSchema(options));
        parts.push(`${this.method.generateSchema(options)}:${this.path.generateSchema(options)}`);
        parts.push(this.parameters.generateSchema(options));
        lines.push(parts.filter((part) => part.length > 0).join(" "));
        let request = this.request.generateSchema(Object.assign(Object.assign({}, options), { eol: options.eol + "\t" }));
        if (request !== "") {
            lines.push(`\t<= ${request}`);
        }
        let response = this.response.generateSchema(Object.assign(Object.assign({}, options), { eol: options.eol + "\t" }));
        if (response !== "") {
            lines.push(`\t=> ${response}`);
        }
        return lines.join(options.eol) + ";";
    }
    static parse(tokenizer) {
        return tokenizer.newContext((read, peek) => {
            var _a, _b, _c;
            tokenization.expect(read(), "route");
            let alias = new Alias("");
            try {
                alias = Alias.parse(tokenizer);
            }
            catch (error) { }
            let method = Method.parse(tokenizer);
            tokenization.expect(read(), ":");
            let path = Path.parse(tokenizer);
            let parameters = new Parameters([]);
            if (((_a = peek()) === null || _a === void 0 ? void 0 : _a.family) === "?") {
                tokenization.expect(read(), "?");
                parameters = Parameters.parse(tokenizer);
            }
            let request = new Message(new Headers([]), types.UndefinedType.INSTANCE);
            if (((_b = peek()) === null || _b === void 0 ? void 0 : _b.family) === "<=") {
                tokenization.expect(read(), "<=");
                request = Message.parse(tokenizer);
            }
            let response = new Message(new Headers([]), types.UndefinedType.INSTANCE);
            if (((_c = peek()) === null || _c === void 0 ? void 0 : _c.family) === "=>") {
                tokenization.expect(read(), "=>");
                response = Message.parse(tokenizer);
            }
            tokenization.expect(read(), ";");
            return new Route(alias, method, path, parameters, request, response);
        });
    }
}
exports.Route = Route;
;
