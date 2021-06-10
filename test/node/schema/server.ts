// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "../../../";
import * as shared from "./index";

export const makeServer = (routes: autoguard.api.Server<shared.Autoguard.Requests, shared.Autoguard.Responses>, options?: Partial<{ urlPrefix: string }>): autoguard.api.RequestListener => {
	let endpoints = new Array<autoguard.api.Endpoint>();
	endpoints.push((raw, auxillary) => {
		let method = "POST";
		let components = new Array<[string, string]>();
		components.push(["component", raw.components[0]]);
		components.push(["", decodeURIComponent("")]);
		return {
			acceptsComponents: () => autoguard.api.acceptsComponents(raw.components, components),
			acceptsMethod: () => autoguard.api.acceptsMethod(raw.method, method),
			validateRequest: async () => {
				let options = autoguard.api.combineKeyValuePairs(raw.parameters);
				options["component"] = autoguard.api.getPlainOption(components, "component");
				options["parameter"] = autoguard.api.getPlainOption(raw.parameters, "parameter");
				let headers = autoguard.api.combineKeyValuePairs(raw.headers);
				headers["header"] = autoguard.api.getPlainOption(raw.headers, "header");
				let payload = await autoguard.api.deserializePayload(raw.payload);
				let guard = shared.Autoguard.Requests["POST:/<component>/"];
				let request = guard.as({ options, headers, payload }, "request");
				return {
					handleRequest: async () => {
						let response = await routes["POST:/<component>/"](new autoguard.api.ClientRequest(request, auxillary));
						return {
							validateResponse: async () => {
								let guard = shared.Autoguard.Responses["POST:/<component>/"];
								guard.as(response, "response");
								return response;
							}
						};
					}
				};
			}
		};
	});
	return (request, response) => autoguard.api.route(endpoints, request, response, options?.urlPrefix);
};
