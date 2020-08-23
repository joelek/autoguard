// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

export type MyAnyType = any;

export const MyAnyType = {
	as(subject: any, path: string = ""): MyAnyType {
		return ((subject, path) => {
			return subject;
		})(subject, path);
	},
	is(subject: any): subject is MyAnyType {
		try {
			MyAnyType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyArrayOfStringType = string[];

export const MyArrayOfStringType = {
	as(subject: any, path: string = ""): MyArrayOfStringType {
		return ((subject, path) => {
			if ((subject != null) && (subject.constructor === globalThis.Array)) {
				for (let i = 0; i < subject.length; i++) {
					((subject, path) => {
						if ((subject != null) && (subject.constructor === globalThis.String)) {
							return subject as string;
						}
						throw "Type guard \"String\" failed at \"" + path + "\"!";
					})(subject[i], path + "[" + i + "]");
				}
				return subject;
			}
			throw "Type guard \"Array\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyArrayOfStringType {
		try {
			MyArrayOfStringType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyBooleanType = boolean;

export const MyBooleanType = {
	as(subject: any, path: string = ""): MyBooleanType {
		return ((subject, path) => {
			if ((subject != null) && (subject.constructor === globalThis.Boolean)) {
				return subject as boolean;
			}
			throw "Type guard \"Boolean\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyBooleanType {
		try {
			MyBooleanType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyIntersectionType = ({
	"a_string_member": string
} & {
	"another_string_member": string
});

export const MyIntersectionType = {
	as(subject: any, path: string = ""): MyIntersectionType {
		return ((subject, path) => {
			((subject, path) => {
				if ((subject != null) && (subject.constructor === globalThis.Object)) {
					((subject, path) => {
						if ((subject != null) && (subject.constructor === globalThis.String)) {
							return subject as string;
						}
						throw "Type guard \"String\" failed at \"" + path + "\"!";
					})(subject["a_string_member"], path + "[\"a_string_member\"]");
					return subject;
				}
				throw "Type guard \"Object\" failed at \"" + path + "\"!";
			})(subject, path);
			((subject, path) => {
				if ((subject != null) && (subject.constructor === globalThis.Object)) {
					((subject, path) => {
						if ((subject != null) && (subject.constructor === globalThis.String)) {
							return subject as string;
						}
						throw "Type guard \"String\" failed at \"" + path + "\"!";
					})(subject["another_string_member"], path + "[\"another_string_member\"]");
					return subject;
				}
				throw "Type guard \"Object\" failed at \"" + path + "\"!";
			})(subject, path);
			return subject;
		})(subject, path);
	},
	is(subject: any): subject is MyIntersectionType {
		try {
			MyIntersectionType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyNullType = null;

export const MyNullType = {
	as(subject: any, path: string = ""): MyNullType {
		return ((subject, path) => {
			if (subject === null) {
				return subject;
			}
			throw "Type guard \"Null\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyNullType {
		try {
			MyNullType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyNumberType = number;

export const MyNumberType = {
	as(subject: any, path: string = ""): MyNumberType {
		return ((subject, path) => {
			if ((subject != null) && (subject.constructor === globalThis.Number)) {
				return subject as number;
			}
			throw "Type guard \"Number\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyNumberType {
		try {
			MyNumberType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyNumberLiteralType = 1337;

export const MyNumberLiteralType = {
	as(subject: any, path: string = ""): MyNumberLiteralType {
		return ((subject, path) => {
			if (subject === 1337) {
				return subject;
			}
			throw "Type guard \"NumberLiteral\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyNumberLiteralType {
		try {
			MyNumberLiteralType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyObjectType = {
	"string_member": string,
	"optional_member"?: string,
	"member-with-dashes": string
};

export const MyObjectType = {
	as(subject: any, path: string = ""): MyObjectType {
		return ((subject, path) => {
			if ((subject != null) && (subject.constructor === globalThis.Object)) {
				((subject, path) => {
					if ((subject != null) && (subject.constructor === globalThis.String)) {
						return subject as string;
					}
					throw "Type guard \"String\" failed at \"" + path + "\"!";
				})(subject["string_member"], path + "[\"string_member\"]");
				((subject, path) => {
					try {
						return ((subject, path) => {
							if (subject === undefined) {
								return subject;
							}
							throw "Type guard \"Undefined\" failed at \"" + path + "\"!";
						})(subject, path);
					} catch (error) {}
					try {
						return ((subject, path) => {
							if ((subject != null) && (subject.constructor === globalThis.String)) {
								return subject as string;
							}
							throw "Type guard \"String\" failed at \"" + path + "\"!";
						})(subject, path);
					} catch (error) {}
					throw "Type guard \"Union\" failed at \"" + path + "\"!";
				})(subject["optional_member"], path + "[\"optional_member\"]");
				((subject, path) => {
					if ((subject != null) && (subject.constructor === globalThis.String)) {
						return subject as string;
					}
					throw "Type guard \"String\" failed at \"" + path + "\"!";
				})(subject["member-with-dashes"], path + "[\"member-with-dashes\"]");
				return subject;
			}
			throw "Type guard \"Object\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyObjectType {
		try {
			MyObjectType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyRecordOfStringType = { [key: string]: undefined | string };

export const MyRecordOfStringType = {
	as(subject: any, path: string = ""): MyRecordOfStringType {
		return ((subject, path) => {
			if ((subject != null) && (subject.constructor === globalThis.Object)) {
				for (let key of globalThis.Object.keys(subject)) {
					((subject, path) => {
						if ((subject != null) && (subject.constructor === globalThis.String)) {
							return subject as string;
						}
						throw "Type guard \"String\" failed at \"" + path + "\"!";
					})(subject[key], path + "[\"" + key + "\"]");
				}
				return subject;
			}
			throw "Type guard \"Record\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyRecordOfStringType {
		try {
			MyRecordOfStringType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyReferenceType = MyObjectType;

export const MyReferenceType = {
	as(subject: any, path: string = ""): MyReferenceType {
		return (MyObjectType.as)(subject, path);
	},
	is(subject: any): subject is MyReferenceType {
		try {
			MyReferenceType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyStringType = string;

export const MyStringType = {
	as(subject: any, path: string = ""): MyStringType {
		return ((subject, path) => {
			if ((subject != null) && (subject.constructor === globalThis.String)) {
				return subject as string;
			}
			throw "Type guard \"String\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyStringType {
		try {
			MyStringType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyStringLiteralType = "literal";

export const MyStringLiteralType = {
	as(subject: any, path: string = ""): MyStringLiteralType {
		return ((subject, path) => {
			if (subject === "literal") {
				return subject;
			}
			throw "Type guard \"StringLiteral\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyStringLiteralType {
		try {
			MyStringLiteralType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyTupleType = [
	string,
	number
];

export const MyTupleType = {
	as(subject: any, path: string = ""): MyTupleType {
		return ((subject, path) => {
			if ((subject != null) && (subject.constructor === globalThis.Array)) {
				((subject, path) => {
					if ((subject != null) && (subject.constructor === globalThis.String)) {
						return subject as string;
					}
					throw "Type guard \"String\" failed at \"" + path + "\"!";
				})(subject[0], path + "[0]");
				((subject, path) => {
					if ((subject != null) && (subject.constructor === globalThis.Number)) {
						return subject as number;
					}
					throw "Type guard \"Number\" failed at \"" + path + "\"!";
				})(subject[1], path + "[1]");
				return subject as [
					string,
					number
				];
			}
			throw "Type guard \"Tuple\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyTupleType {
		try {
			MyTupleType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyUndefinedType = undefined;

export const MyUndefinedType = {
	as(subject: any, path: string = ""): MyUndefinedType {
		return ((subject, path) => {
			if (subject === undefined) {
				return subject;
			}
			throw "Type guard \"Undefined\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyUndefinedType {
		try {
			MyUndefinedType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type MyUnionType = (string | null);

export const MyUnionType = {
	as(subject: any, path: string = ""): MyUnionType {
		return ((subject, path) => {
			try {
				return ((subject, path) => {
					if ((subject != null) && (subject.constructor === globalThis.String)) {
						return subject as string;
					}
					throw "Type guard \"String\" failed at \"" + path + "\"!";
				})(subject, path);
			} catch (error) {}
			try {
				return ((subject, path) => {
					if (subject === null) {
						return subject;
					}
					throw "Type guard \"Null\" failed at \"" + path + "\"!";
				})(subject, path);
			} catch (error) {}
			throw "Type guard \"Union\" failed at \"" + path + "\"!";
		})(subject, path);
	},
	is(subject: any): subject is MyUnionType {
		try {
			MyUnionType.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	}
};

export type Autoguard = {
	"MyAnyType": MyAnyType,
	"MyArrayOfStringType": MyArrayOfStringType,
	"MyBooleanType": MyBooleanType,
	"MyIntersectionType": MyIntersectionType,
	"MyNullType": MyNullType,
	"MyNumberType": MyNumberType,
	"MyNumberLiteralType": MyNumberLiteralType,
	"MyObjectType": MyObjectType,
	"MyRecordOfStringType": MyRecordOfStringType,
	"MyReferenceType": MyReferenceType,
	"MyStringType": MyStringType,
	"MyStringLiteralType": MyStringLiteralType,
	"MyTupleType": MyTupleType,
	"MyUndefinedType": MyUndefinedType,
	"MyUnionType": MyUnionType
};

export const Autoguard = {
	"MyAnyType": MyAnyType,
	"MyArrayOfStringType": MyArrayOfStringType,
	"MyBooleanType": MyBooleanType,
	"MyIntersectionType": MyIntersectionType,
	"MyNullType": MyNullType,
	"MyNumberType": MyNumberType,
	"MyNumberLiteralType": MyNumberLiteralType,
	"MyObjectType": MyObjectType,
	"MyRecordOfStringType": MyRecordOfStringType,
	"MyReferenceType": MyReferenceType,
	"MyStringType": MyStringType,
	"MyStringLiteralType": MyStringLiteralType,
	"MyTupleType": MyTupleType,
	"MyUndefinedType": MyUndefinedType,
	"MyUnionType": MyUnionType
};
