import * as is from "./is";
import * as shared from "./shared";
import * as tokenization from "./tokenization";
import * as types from "./types";

export type TableMember = {
	key: types.StringLiteralType;
	value: types.NumberLiteralType;
};

export class Table {
	typename: string;
	members: Array<TableMember>;

	constructor(typename: string, members: Array<TableMember>) {
		this.typename = typename;
		this.members = members;
	}

	generateSchema(options: shared.Options): string {
		let lines = new Array<string>();
		for (let { key, value } of this.members) {
			lines.push(`\t"${key}": ${value}`);
		}
		let body = lines.length > 0 ? options.eol + lines.join("," + options.eol) + options.eol : "";
		return `table ${this.typename}: {${body}};`;
	}

	static parse(tokenizer: tokenization.Tokenizer): Table {
		return tokenizer.newContext((read, peek) => {
			tokenization.expect(read(), "table");
			let typename = tokenization.expect(read(), "IDENTIFIER").value;
			tokenization.expect(read(), ":");
			tokenization.expect(read(), "{");
			let members = new Array<TableMember>();
			if (peek()?.value !== "}") {
				let nextValue = 0;
				while (true) {
					let key = types.StringLiteralType.parse(tokenizer, []);
					let value: types.NumberLiteralType | undefined;
					if (peek()?.family === ":") {
						tokenization.expect(read(), ":");
						value = types.NumberLiteralType.parse(tokenizer, []);
					}
					if (is.absent(value)) {
						value = new types.NumberLiteralType(nextValue);
					}
					members.push({
						key,
						value
					});
					nextValue = value.value + 1;
					if (peek()?.value !== ",") {
						break;
					}
					tokenization.expect(read(), ",");
				}
			}
			tokenization.expect(read(), "}");
			tokenization.expect(read(), ";");
			return new Table(typename, members);
		});
	}
};