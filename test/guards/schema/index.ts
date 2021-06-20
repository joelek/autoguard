// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "../../../";

export const MyAnyType = autoguard.guards.Any;

export type MyAnyType = ReturnType<typeof MyAnyType["as"]>;

export const MyArrayOfStringType = autoguard.guards.Array.of(autoguard.guards.String);

export type MyArrayOfStringType = ReturnType<typeof MyArrayOfStringType["as"]>;

export const MyBooleanType = autoguard.guards.Boolean;

export type MyBooleanType = ReturnType<typeof MyBooleanType["as"]>;

export const MyBooleanliteralType = autoguard.guards.BooleanLiteral.of(true);

export type MyBooleanliteralType = ReturnType<typeof MyBooleanliteralType["as"]>;

export const MyGroupType = autoguard.guards.Group.of(autoguard.guards.Any);

export type MyGroupType = ReturnType<typeof MyGroupType["as"]>;

export const MyIntersectionType = autoguard.guards.Intersection.of(
	autoguard.guards.Object.of({
		"a_string_member": autoguard.guards.String
	}),
	autoguard.guards.Object.of({
		"another_string_member": autoguard.guards.String
	})
);

export type MyIntersectionType = ReturnType<typeof MyIntersectionType["as"]>;

export const MyNullType = autoguard.guards.Null;

export type MyNullType = ReturnType<typeof MyNullType["as"]>;

export const MyNumberType = autoguard.guards.Number;

export type MyNumberType = ReturnType<typeof MyNumberType["as"]>;

export const MyNumberLiteralType = autoguard.guards.NumberLiteral.of(1337);

export type MyNumberLiteralType = ReturnType<typeof MyNumberLiteralType["as"]>;

export const MyObjectType = autoguard.guards.Object.of({
	"string_member": autoguard.guards.String,
	"optional_member": autoguard.guards.Union.of(
		autoguard.guards.String,
		autoguard.guards.Undefined
	),
	"quoted-member": autoguard.guards.String
});

export type MyObjectType = ReturnType<typeof MyObjectType["as"]>;

export const MyRecordOfStringType = autoguard.guards.Record.of(autoguard.guards.String);

export type MyRecordOfStringType = ReturnType<typeof MyRecordOfStringType["as"]>;

export const MyReferenceType = autoguard.guards.Reference.of(() => MyObjectType);

export type MyReferenceType = ReturnType<typeof MyReferenceType["as"]>;

export const MyStringType = autoguard.guards.String;

export type MyStringType = ReturnType<typeof MyStringType["as"]>;

export const MyStringLiteralType = autoguard.guards.StringLiteral.of("räksmörgås");

export type MyStringLiteralType = ReturnType<typeof MyStringLiteralType["as"]>;

export const MyTupleType = autoguard.guards.Tuple.of(
	autoguard.guards.String,
	autoguard.guards.Number
);

export type MyTupleType = ReturnType<typeof MyTupleType["as"]>;

export const MyUndefinedType = autoguard.guards.Undefined;

export type MyUndefinedType = ReturnType<typeof MyUndefinedType["as"]>;

export const MyUnionType = autoguard.guards.Union.of(
	autoguard.guards.String,
	autoguard.guards.Null
);

export type MyUnionType = ReturnType<typeof MyUnionType["as"]>;

export namespace Autoguard {
	export const Guards = {
		"MyAnyType": autoguard.guards.Reference.of(() => MyAnyType),
		"MyArrayOfStringType": autoguard.guards.Reference.of(() => MyArrayOfStringType),
		"MyBooleanType": autoguard.guards.Reference.of(() => MyBooleanType),
		"MyBooleanliteralType": autoguard.guards.Reference.of(() => MyBooleanliteralType),
		"MyGroupType": autoguard.guards.Reference.of(() => MyGroupType),
		"MyIntersectionType": autoguard.guards.Reference.of(() => MyIntersectionType),
		"MyNullType": autoguard.guards.Reference.of(() => MyNullType),
		"MyNumberType": autoguard.guards.Reference.of(() => MyNumberType),
		"MyNumberLiteralType": autoguard.guards.Reference.of(() => MyNumberLiteralType),
		"MyObjectType": autoguard.guards.Reference.of(() => MyObjectType),
		"MyRecordOfStringType": autoguard.guards.Reference.of(() => MyRecordOfStringType),
		"MyReferenceType": autoguard.guards.Reference.of(() => MyReferenceType),
		"MyStringType": autoguard.guards.Reference.of(() => MyStringType),
		"MyStringLiteralType": autoguard.guards.Reference.of(() => MyStringLiteralType),
		"MyTupleType": autoguard.guards.Reference.of(() => MyTupleType),
		"MyUndefinedType": autoguard.guards.Reference.of(() => MyUndefinedType),
		"MyUnionType": autoguard.guards.Reference.of(() => MyUnionType)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};
