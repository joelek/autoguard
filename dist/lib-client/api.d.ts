import * as shared from "../lib-shared";
export * from "../lib-shared/api";
export declare class ServerResponse<A extends shared.api.EndpointResponse> {
    private response;
    private collect;
    private collectedPayload?;
    constructor(response: A, collect: boolean);
    status(): number;
    headers(): {} & A["headers"];
    payload(maxByteLength?: number): Promise<shared.api.CollectedPayload<A["payload"]>>;
}
export type Client<A extends shared.api.RequestMap<A>, B extends shared.api.ResponseMap<B>> = {
    [C in keyof A & keyof B]: (request: A[C], requestOptions?: shared.api.RequestOptions) => Promise<ServerResponse<B[C]>>;
};
export type XHRRequestHandlerOptions = {};
export declare function makeXHRRequestHandler(options?: XHRRequestHandlerOptions): shared.api.RequestHandler;
export declare const xhr: shared.api.RequestHandler;
export declare function finalizeRequest(raw: shared.api.RawRequest, defaultHeaders: Array<[string, string]>): shared.api.RawRequest;
