// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "../../../dist/lib-shared";

export enum Table {
	"A" = 0,
	"B" = 1
};

export namespace Table {
	export const Entries = [
		{ key: "A", value: 0 },
		{ key: "B", value: 1 }
	] as const;

	export const Keys = autoguard.tables.createKeys(Entries);

	export const Values = autoguard.tables.createValues(Entries);

	export const KeyToValueMap = autoguard.tables.createKeyToValueMap(Entries);

	export const ValueToKeyMap = autoguard.tables.createValueToKeyMap(Entries);

	export type Key = typeof Keys[number];
	export const Key: autoguard.serialization.MessageGuard<Key> = autoguard.guards.Key.of(KeyToValueMap);

	export type Value = typeof Values[number];
	export const Value: autoguard.serialization.MessageGuard<Value> = autoguard.guards.Key.of(ValueToKeyMap);

	export function keyFromValue(value: number): Key {
		return ValueToKeyMap[Value.as(value)];
	};

	export function valueFromKey(key: string): Value {
		return KeyToValueMap[Key.as(key)];
	};
};

export const Guard: autoguard.serialization.MessageGuard<Guard> = autoguard.guards.Object.of({
	"key": autoguard.guards.Reference.of(() => Table.Key),
	"value": autoguard.guards.Reference.of(() => Table.Value)
}, {});

export type Guard = autoguard.guards.Object<{
	"key": autoguard.guards.Reference<Table.Key>,
	"value": autoguard.guards.Reference<Table.Value>
}, {}>;

export namespace Autoguard {
	export const Guards = {
		"Guard": autoguard.guards.Reference.of(() => Guard)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};
