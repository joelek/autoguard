// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "../../../";

export namespace Autoguard {
	export const Guards = {};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {
		"POST:/<component>/": autoguard.guards.Object.of({
			"options": autoguard.guards.Intersection.of(
				autoguard.api.Options,
				autoguard.guards.Object.of({
					"component": autoguard.guards.String,
					"parameter": autoguard.guards.String
				})
			),
			"headers": autoguard.guards.Intersection.of(
				autoguard.api.Headers,
				autoguard.guards.Object.of({
					"header": autoguard.guards.String
				})
			),
			"payload": autoguard.guards.Object.of({
				"member": autoguard.guards.String
			})
		})
	};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {
		"POST:/<component>/": autoguard.guards.Object.of({
			"status": autoguard.guards.Union.of(
				autoguard.guards.Undefined,
				autoguard.guards.Number
			),
			"headers": autoguard.guards.Intersection.of(
				autoguard.api.Headers,
				autoguard.guards.Object.of({
					"header": autoguard.guards.String
				})
			),
			"payload": autoguard.guards.Object.of({
				"member": autoguard.guards.String
			})
		})
	};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};
