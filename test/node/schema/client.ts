// This file was auto-generated by @joelek/autoguard. Edit at own risk.

import * as autoguard from "../../../dist/lib-client";
import * as shared from "./index";

export type Client = autoguard.api.Client<shared.Autoguard.Requests, shared.Autoguard.Responses>;

export const makeClient = (clientOptions?: autoguard.api.ClientOptions): Client => ({
	"plain": async (request, requestOptions) => {
		let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["plain"], clientOptions?.debugMode);
		guard.as(request, "request");
		let method = "POST";
		let components = new Array<string>();
		components.push("plain");
		components.push(...autoguard.api.encodeComponents([request.options?.["ca"]], true));
		components.push(...autoguard.api.encodeComponents([request.options?.["cb"]], true));
		components.push(...autoguard.api.encodeComponents(request.options?.["cc"] ?? [], true));
		let parameters = new Array<[string, string]>();
		parameters.push(...autoguard.api.encodeParameterPairs("pa", [request.options?.["pa"]], true));
		parameters.push(...autoguard.api.encodeParameterPairs("pb", [request.options?.["pb"]], true));
		parameters.push(...autoguard.api.encodeParameterPairs("pc", request.options?.["pc"] ?? [], true));
		parameters.push(...autoguard.api.encodeUndeclaredParameterPairs(request.options ?? {}, [...["ca","cb","cc"], ...parameters.map((parameter) => parameter[0])]));
		let headers = new Array<[string, string]>();
		headers.push(...autoguard.api.encodeHeaderPairs("ha", [request.headers?.["ha"]], true));
		headers.push(...autoguard.api.encodeHeaderPairs("hb", [request.headers?.["hb"]], true));
		headers.push(...autoguard.api.encodeHeaderPairs("hc", request.headers?.["hc"] ?? [], true));
		headers.push(...autoguard.api.encodeUndeclaredHeaderPairs(request.headers ?? {}, headers.map((header) => header[0])));
		let payload = request.payload ?? [];
		let requestHandler = clientOptions?.requestHandler ?? autoguard.api.xhr;
		let defaultHeaders = clientOptions?.defaultHeaders?.slice() ?? [];
		defaultHeaders.push(["Content-Type", "application/octet-stream"]);
		defaultHeaders.push(["Accept", "application/octet-stream"]);
		let raw = await requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
		{
			let status = raw.status;
			let headers: Record<string, autoguard.api.JSON> = {};
			headers["ha"] = autoguard.api.decodeHeaderValue(raw.headers, "ha", true);
			headers["hb"] = autoguard.api.decodeHeaderValue(raw.headers, "hb", true);
			headers["hc"] = autoguard.api.decodeHeaderValues(raw.headers, "hc", true);
			headers = { ...headers, ...autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)) };
			let payload = raw.payload;
			let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["plain"], clientOptions?.debugMode);
			let response = guard.as({ status, headers, payload }, "response");
			return new autoguard.api.ServerResponse(response, true);
		}
	},
	"json": async (request, requestOptions) => {
		let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["json"], clientOptions?.debugMode);
		guard.as(request, "request");
		let method = "POST";
		let components = new Array<string>();
		components.push("json");
		components.push(...autoguard.api.encodeComponents([request.options?.["ca"]], false));
		components.push(...autoguard.api.encodeComponents([request.options?.["cb"]], false));
		components.push(...autoguard.api.encodeComponents(request.options?.["cc"] ?? [], false));
		let parameters = new Array<[string, string]>();
		parameters.push(...autoguard.api.encodeParameterPairs("pa", [request.options?.["pa"]], false));
		parameters.push(...autoguard.api.encodeParameterPairs("pb", [request.options?.["pb"]], false));
		parameters.push(...autoguard.api.encodeParameterPairs("pc", request.options?.["pc"] ?? [], false));
		parameters.push(...autoguard.api.encodeUndeclaredParameterPairs(request.options ?? {}, [...["ca","cb","cc"], ...parameters.map((parameter) => parameter[0])]));
		let headers = new Array<[string, string]>();
		headers.push(...autoguard.api.encodeHeaderPairs("ha", [request.headers?.["ha"]], false));
		headers.push(...autoguard.api.encodeHeaderPairs("hb", [request.headers?.["hb"]], false));
		headers.push(...autoguard.api.encodeHeaderPairs("hc", request.headers?.["hc"] ?? [], false));
		headers.push(...autoguard.api.encodeUndeclaredHeaderPairs(request.headers ?? {}, headers.map((header) => header[0])));
		let payload = request.payload ?? [];
		let requestHandler = clientOptions?.requestHandler ?? autoguard.api.xhr;
		let defaultHeaders = clientOptions?.defaultHeaders?.slice() ?? [];
		defaultHeaders.push(["Content-Type", "application/octet-stream"]);
		defaultHeaders.push(["Accept", "application/octet-stream"]);
		let raw = await requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
		{
			let status = raw.status;
			let headers: Record<string, autoguard.api.JSON> = {};
			headers["ha"] = autoguard.api.decodeHeaderValue(raw.headers, "ha", false);
			headers["hb"] = autoguard.api.decodeHeaderValue(raw.headers, "hb", false);
			headers["hc"] = autoguard.api.decodeHeaderValues(raw.headers, "hc", false);
			headers = { ...headers, ...autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)) };
			let payload = raw.payload;
			let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["json"], clientOptions?.debugMode);
			let response = guard.as({ status, headers, payload }, "response");
			return new autoguard.api.ServerResponse(response, true);
		}
	},
});
