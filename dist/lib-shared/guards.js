"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Union = exports.UnionGuard = exports.Undefined = exports.UndefinedGuard = exports.Tuple = exports.TupleGuard = exports.StringLiteral = exports.StringLiteralGuard = exports.String = exports.StringGuard = exports.Reference = exports.ReferenceGuard = exports.Key = exports.KeyGuard = exports.Record = exports.RecordGuard = exports.Object = exports.ObjectGuard = exports.NumberLiteral = exports.NumberLiteralGuard = exports.Number = exports.NumberGuard = exports.Null = exports.NullGuard = exports.Intersection = exports.IntersectionGuard = exports.IntegerLiteral = exports.IntegerLiteralGuard = exports.Integer = exports.IntegerGuard = exports.Group = exports.GroupGuard = exports.BooleanLiteral = exports.BooleanLiteralGuard = exports.Boolean = exports.BooleanGuard = exports.Binary = exports.BinaryGuard = exports.BigInt = exports.BigIntGuard = exports.Array = exports.ArrayGuard = exports.Any = exports.AnyGuard = void 0;
const serialization = require("./serialization");
class AnyGuard extends serialization.MessageGuardBase {
    constructor() {
        super();
    }
    as(subject, path = "") {
        return subject;
    }
    ts(eol = "\n") {
        return "any";
    }
}
exports.AnyGuard = AnyGuard;
;
exports.Any = new AnyGuard();
class ArrayGuard extends serialization.MessageGuardBase {
    constructor(guard) {
        super();
        this.guard = guard;
    }
    as(subject, path = "") {
        if ((subject != null) && (subject.constructor === globalThis.Array)) {
            for (let i = 0; i < subject.length; i++) {
                this.guard.as(subject[i], path + "[" + i + "]");
            }
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return `array<${this.guard.ts(eol)}>`;
    }
}
exports.ArrayGuard = ArrayGuard;
;
exports.Array = {
    of(guard) {
        return new ArrayGuard(guard);
    }
};
class BigIntGuard extends serialization.MessageGuardBase {
    constructor() {
        super();
    }
    as(subject, path = "") {
        if ((subject != null) && (subject.constructor === globalThis.BigInt)) {
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return "bigint";
    }
}
exports.BigIntGuard = BigIntGuard;
;
exports.BigInt = new BigIntGuard();
class BinaryGuard extends serialization.MessageGuardBase {
    constructor() {
        super();
    }
    as(subject, path = "") {
        if ((subject != null) && (subject instanceof Uint8Array)) {
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return "binary";
    }
}
exports.BinaryGuard = BinaryGuard;
;
exports.Binary = new BinaryGuard();
class BooleanGuard extends serialization.MessageGuardBase {
    constructor() {
        super();
    }
    as(subject, path = "") {
        if ((subject != null) && (subject.constructor === globalThis.Boolean)) {
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return "boolean";
    }
}
exports.BooleanGuard = BooleanGuard;
;
exports.Boolean = new BooleanGuard();
class BooleanLiteralGuard extends serialization.MessageGuardBase {
    constructor(value) {
        super();
        this.value = value;
    }
    as(subject, path = "") {
        if (subject === this.value) {
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return `${this.value}`;
    }
}
exports.BooleanLiteralGuard = BooleanLiteralGuard;
;
exports.BooleanLiteral = {
    of(value) {
        return new BooleanLiteralGuard(value);
    }
};
class GroupGuard extends serialization.MessageGuardBase {
    constructor(guard, name) {
        super();
        this.guard = guard;
        this.name = name;
    }
    as(subject, path = "") {
        return this.guard.as(subject, path);
    }
    ts(eol = "\n") {
        var _a;
        return (_a = this.name) !== null && _a !== void 0 ? _a : this.guard.ts(eol);
    }
}
exports.GroupGuard = GroupGuard;
;
exports.Group = {
    of(guard, name) {
        return new GroupGuard(guard, name);
    }
};
class IntegerGuard extends serialization.MessageGuardBase {
    constructor(min, max) {
        super();
        this.min = min;
        this.max = max;
    }
    as(subject, path = "") {
        if ((subject != null) && (subject.constructor === globalThis.Number) && globalThis.Number.isInteger(subject)) {
            let number = subject;
            if (this.min != null && number < this.min) {
                throw new serialization.MessageGuardError(this, subject, path);
            }
            if (this.max != null && number > this.max) {
                throw new serialization.MessageGuardError(this, subject, path);
            }
            return number;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        var _a, _b;
        if (this.min == null && this.max == null) {
            return "integer";
        }
        else {
            return `integer(${(_a = this.min) !== null && _a !== void 0 ? _a : "*"}, ${(_b = this.max) !== null && _b !== void 0 ? _b : "*"})`;
        }
    }
}
exports.IntegerGuard = IntegerGuard;
;
exports.Integer = new IntegerGuard();
class IntegerLiteralGuard extends serialization.MessageGuardBase {
    constructor(value) {
        super();
        this.value = value;
    }
    as(subject, path = "") {
        if (subject === this.value) {
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return `${this.value}`;
    }
}
exports.IntegerLiteralGuard = IntegerLiteralGuard;
;
exports.IntegerLiteral = {
    of(value) {
        return new IntegerLiteralGuard(value);
    }
};
class IntersectionGuard extends serialization.MessageGuardBase {
    constructor(...guards) {
        super();
        this.guards = guards;
    }
    as(subject, path = "") {
        for (let guard of this.guards) {
            guard.as(subject, path);
        }
        return subject;
    }
    ts(eol = "\n") {
        let lines = new globalThis.Array();
        for (let guard of this.guards) {
            lines.push("\t" + guard.ts(eol + "\t"));
        }
        return lines.length === 0 ? "intersection<>" : "intersection<" + eol + lines.join("," + eol) + eol + ">";
    }
}
exports.IntersectionGuard = IntersectionGuard;
;
exports.Intersection = {
    of(...guards) {
        return new IntersectionGuard(...guards);
    }
};
class NullGuard extends serialization.MessageGuardBase {
    constructor() {
        super();
    }
    as(subject, path = "") {
        if (subject === null) {
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return "null";
    }
}
exports.NullGuard = NullGuard;
;
exports.Null = new NullGuard();
class NumberGuard extends serialization.MessageGuardBase {
    constructor(min, max) {
        super();
        this.min = min;
        this.max = max;
    }
    as(subject, path = "") {
        if ((subject != null) && (subject.constructor === globalThis.Number)) {
            let number = subject;
            if (this.min != null && number < this.min) {
                throw new serialization.MessageGuardError(this, subject, path);
            }
            if (this.max != null && number > this.max) {
                throw new serialization.MessageGuardError(this, subject, path);
            }
            return number;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        var _a, _b;
        if (this.min == null && this.max == null) {
            return "number";
        }
        else {
            return `number(${(_a = this.min) !== null && _a !== void 0 ? _a : "*"}, ${(_b = this.max) !== null && _b !== void 0 ? _b : "*"})`;
        }
    }
}
exports.NumberGuard = NumberGuard;
;
exports.Number = new NumberGuard();
class NumberLiteralGuard extends serialization.MessageGuardBase {
    constructor(value) {
        super();
        this.value = value;
    }
    as(subject, path = "") {
        if (subject === this.value) {
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return `${this.value}`;
    }
}
exports.NumberLiteralGuard = NumberLiteralGuard;
;
exports.NumberLiteral = {
    of(value) {
        return new NumberLiteralGuard(value);
    }
};
class ObjectGuard extends serialization.MessageGuardBase {
    constructor(required, optional) {
        super();
        this.required = required;
        this.optional = optional;
    }
    as(subject, path = "") {
        if ((subject != null) && (subject.constructor === globalThis.Object)) {
            for (let key in this.required) {
                this.required[key].as(subject[key], path + (/^([a-z][a-z0-9_]*)$/isu.test(key) ? "." + key : "[\"" + key + "\"]"));
            }
            for (let key in this.optional) {
                if (key in subject && subject[key] !== undefined) {
                    this.optional[key].as(subject[key], path + (/^([a-z][a-z0-9_]*)$/isu.test(key) ? "." + key : "[\"" + key + "\"]"));
                }
            }
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        let lines = new globalThis.Array();
        for (let [key, value] of globalThis.Object.entries(this.required)) {
            lines.push(`\t"${key}": ${value.ts(eol + "\t")}`);
        }
        for (let [key, value] of globalThis.Object.entries(this.optional)) {
            lines.push(`\t"${key}"?: ${value.ts(eol + "\t")}`);
        }
        return lines.length === 0 ? "object<>" : "object<" + eol + lines.join("," + eol) + eol + ">";
    }
}
exports.ObjectGuard = ObjectGuard;
;
exports.Object = {
    of(required, optional = {}) {
        return new ObjectGuard(required, optional);
    }
};
class RecordGuard extends serialization.MessageGuardBase {
    constructor(guard) {
        super();
        this.guard = guard;
    }
    as(subject, path = "") {
        if ((subject != null) && (subject.constructor === globalThis.Object)) {
            let wrapped = exports.Union.of(exports.Undefined, this.guard);
            for (let key of globalThis.Object.keys(subject)) {
                wrapped.as(subject[key], path + "[\"" + key + "\"]");
            }
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return `record<${this.guard.ts(eol)}>`;
    }
}
exports.RecordGuard = RecordGuard;
;
exports.Record = {
    of(guard) {
        return new RecordGuard(guard);
    }
};
class KeyGuard extends serialization.MessageGuardBase {
    constructor(record) {
        super();
        this.record = record;
    }
    as(subject, path = "") {
        if ((subject != null) && (subject.constructor === globalThis.String || subject.constructor === globalThis.Number)) {
            let string = subject;
            if (string in this.record) {
                return string;
            }
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        let lines = new globalThis.Array();
        for (let key of globalThis.Object.keys(this.record)) {
            lines.push(`\t"${key}"`);
        }
        return lines.length === 0 ? "key<>" : "key<" + eol + lines.join("," + eol) + eol + ">";
    }
}
exports.KeyGuard = KeyGuard;
;
exports.Key = {
    of(record) {
        return new KeyGuard(record);
    }
};
class ReferenceGuard extends serialization.MessageGuardBase {
    constructor(guard) {
        super();
        this.guard = guard;
    }
    as(subject, path = "") {
        return this.guard().as(subject, path);
    }
    ts(eol = "\n") {
        return this.guard().ts(eol);
    }
}
exports.ReferenceGuard = ReferenceGuard;
;
exports.Reference = {
    of(guard) {
        return new ReferenceGuard(guard);
    }
};
class StringGuard extends serialization.MessageGuardBase {
    constructor(pattern) {
        super();
        this.pattern = pattern;
    }
    as(subject, path = "") {
        if ((subject != null) && (subject.constructor === globalThis.String)) {
            let string = subject;
            if (this.pattern != null && !this.pattern.test(string)) {
                throw new serialization.MessageGuardError(this, subject, path);
            }
            return string;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        if (this.pattern == null) {
            return "string";
        }
        else {
            let pattern = this.pattern != null ? `"${this.pattern.source}"` : "*";
            return `string(${pattern})`;
        }
    }
}
exports.StringGuard = StringGuard;
;
exports.String = new StringGuard();
class StringLiteralGuard extends serialization.MessageGuardBase {
    constructor(value) {
        super();
        this.value = value;
    }
    as(subject, path = "") {
        if (subject === this.value) {
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return `"${this.value}"`;
    }
}
exports.StringLiteralGuard = StringLiteralGuard;
;
exports.StringLiteral = {
    of(value) {
        return new StringLiteralGuard(value);
    }
};
class TupleGuard extends serialization.MessageGuardBase {
    constructor(...guards) {
        super();
        this.guards = guards;
    }
    as(subject, path = "") {
        if ((subject != null) && (subject.constructor === globalThis.Array)) {
            for (let i = 0; i < this.guards.length; i++) {
                this.guards[i].as(subject[i], path + "[" + i + "]");
            }
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        let lines = new globalThis.Array();
        for (let guard of this.guards) {
            lines.push(`\t${guard.ts(eol + "\t")}`);
        }
        return lines.length === 0 ? "tuple<>" : "tuple<" + eol + lines.join("," + eol) + eol + ">";
    }
}
exports.TupleGuard = TupleGuard;
;
exports.Tuple = {
    of(...guards) {
        return new TupleGuard(...guards);
    }
};
class UndefinedGuard extends serialization.MessageGuardBase {
    constructor() {
        super();
    }
    as(subject, path = "") {
        if (subject === undefined) {
            return subject;
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        return "undefined";
    }
}
exports.UndefinedGuard = UndefinedGuard;
;
exports.Undefined = new UndefinedGuard();
class UnionGuard extends serialization.MessageGuardBase {
    constructor(...guards) {
        super();
        this.guards = guards;
    }
    as(subject, path = "") {
        for (let guard of this.guards) {
            try {
                return guard.as(subject, path);
            }
            catch (error) { }
        }
        throw new serialization.MessageGuardError(this, subject, path);
    }
    ts(eol = "\n") {
        let lines = new globalThis.Array();
        for (let guard of this.guards) {
            lines.push("\t" + guard.ts(eol + "\t"));
        }
        return lines.length === 0 ? "union<>" : "union<" + eol + lines.join("," + eol) + eol + ">";
    }
}
exports.UnionGuard = UnionGuard;
;
exports.Union = {
    of(...guards) {
        return new UnionGuard(...guards);
    }
};
