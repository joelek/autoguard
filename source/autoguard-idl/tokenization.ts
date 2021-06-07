export const Families = (<A extends string[]>(...tuple: A): [...A] => tuple)(
	"LS",
	"WS",
	"(",
	")",
	"[",
	"]",
	"{",
	"}",
	"?",
	"|",
	".",
	"..",
	"/",
	"#",
	"&",
	",",
	":",
	";",
	"<",
	">",
	"=>",
	"<=",
	"any",
	"binary",
	"boolean",
	"false",
	"guard",
	"null",
	"number",
	"route",
	"string",
	"true",
	"undefined",
	"IDENTIFIER",
	"NUMBER_LITERAL",
	"STRING_LITERAL",
	"PATH_COMPONENT"
);

export type Families = typeof Families;

export type Family = typeof Families[number];

export const IdentifierFamilies = (<A extends string[]>(...tuple: A): [...A] => tuple)(
	"any",
	"binary",
	"boolean",
	"false",
	"guard",
	"null",
	"number",
	"route",
	"string",
	"true",
	"undefined",
	"IDENTIFIER"
);

export type Token = {
	row: number,
	col: number,
	family: Family,
	value: string
};

export type TypeMap<A extends [...string[]], B> = {
	[_ in A[number]]: B;
};

export function removeWhitespaceAndComments(unfiltered: Array<Token>): Array<Token> {
	let filtered = new Array<Token>();
	let offset = 0;
	while (offset < unfiltered.length) {
		let token = unfiltered[offset];
		offset += 1;
		if (token.family === "WS" || token.family === "LS") {
			continue;
		}
		if (token.family === "#") {
			while (offset < unfiltered.length) {
				let token = unfiltered[offset];
				offset += 1;
				if (token.family === "LS") {
					break;
				}
			}
			continue;
		}
		filtered.push(token);
	}
	return filtered;
};

export class Tokenizer {
	private tokens: Array<Token>;
	private offset: number;

	private peek(): Token | undefined {
		return this.tokens[this.offset];
	}

	private read(): Token {
		if (this.offset >= this.tokens.length) {
			throw `Unexpectedly reached end of stream!`;
		}
		return this.tokens[this.offset++];
	}

	constructor(string: string) {
		let matchers: TypeMap<Families, RegExp> = {
			"LS": /^([\r][\n]|\n)/su,
			"WS": /^([\t ]+)/su,
			"(": /^([\(])/su,
			")": /^([\)])/su,
			"[": /^([\[])/su,
			"]": /^([\]])/su,
			"{": /^([\{])/su,
			"}": /^([\}])/su,
			"?": /^([\?])/su,
			"|": /^([\|])/su,
			".": /^([\.])/su,
			"..": /^([\.][\.])/su,
			"/": /^([\/])/su,
			"#": /^([#])/su,
			"&": /^([&])/su,
			",": /^([,])/su,
			":": /^([:])/su,
			";": /^([;])/su,
			"<": /^([<])/su,
			">": /^([>])/su,
			"=>": /^([=][>])/su,
			"<=": /^([<][=])/su,
			"any": /^(any)/su,
			"binary": /^(binary)/su,
			"boolean": /^(boolean)/su,
			"false": /^(false)/su,
			"guard": /^(guard)/su,
			"null": /^(null)/su,
			"number": /^(number)/su,
			"route": /^(route)/su,
			"string": /^(string)/su,
			"true": /^(true)/su,
			"undefined": /^(undefined)/su,
			"IDENTIFIER": /^([a-zA-Z][a-zA-Z0-9_]*)/su,
			"NUMBER_LITERAL": /^(([1-9][0-9]+)|([0-9]))/su,
			"STRING_LITERAL": /^(["][^"]*["])/su,
			"PATH_COMPONENT": /^(([a-zA-Z0-9_.~-]|[%][0-9a-fA-F]{2})+)/su
		};
		let tokens = new Array<Token>();
		let row = 1;
		let col = 1;
		while (string.length > 0) {
			let token: [Family, string] | undefined;
			for (let key in matchers) {
				let type = key as Family;
				let exec = matchers[type].exec(string);
				if (exec == null) {
					continue;
				}
				if ((token == null) || (exec[1].length > token[1].length)) {
					token = [type, exec[1]];
				}
			}
			if (token == null) {
				throw `Unrecognized token at row ${row}, col ${col}!`;
			}
			tokens.push({
				family: token[0],
				value: token[1],
				row: row,
				col: col
			});
			string = string.slice(token[1].length);
			let lines = token[1].split(/\r?\n/);
			if (lines.length > 1) {
				row += lines.length - 1;
				col = 1;
			}
			col += lines[lines.length - 1].length;
		}
		this.tokens = removeWhitespaceAndComments(tokens);
		this.offset = 0;
	}

	newContext<A>(producer: (read: () => Token, peek: () => Token | undefined) => A): A {
		let offset = this.offset;
		try {
			return producer(() => this.read(), () => this.peek());
		} catch (error) {
			this.offset = offset;
			throw error;
		}
	}
};

export function expect(token: Token, family: Family | Family[]): Token {
	let families = Array.isArray(family) ? family : [family];
	if (!families.includes(token.family)) {
		throw `Unexpected ${token.family} at row ${token.row}, col ${token.col}!`;
	}
	return token;
};