export declare const Options: import("./serialization").MessageGuard<Record<string, string | number | boolean | undefined>>;
export declare type Options = ReturnType<typeof Headers.as>;
export declare const Headers: import("./serialization").MessageGuard<Record<string, string | number | boolean | undefined>>;
export declare type Headers = ReturnType<typeof Headers.as>;
export declare type AsyncBinary = AsyncIterable<Uint8Array>;
export declare const AsyncBinary: {
    as(subject: any, path?: string): AsyncBinary;
    is(subject: any): subject is AsyncBinary;
    ts(eol?: string): string;
};
export declare type SyncBinary = Iterable<Uint8Array>;
export declare const SyncBinary: {
    as(subject: any, path?: string): SyncBinary;
    is(subject: any): subject is SyncBinary;
    ts(eol?: string): string;
};
export declare const Binary: import("./serialization").MessageGuard<AsyncBinary | SyncBinary>;
export declare type Binary = ReturnType<typeof Binary.as>;
export declare type Primitive = boolean | number | string | undefined;
export declare type JSON = boolean | null | number | string | JSON[] | {
    [key: string]: JSON;
} | undefined;
export declare type RequestLike = AsyncBinary & {
    method?: string;
    rawHeaders: string[];
    socket: import("net").Socket | import("tls").TLSSocket;
    url?: string;
};
export declare type ResponseLike = {
    end(): void;
    once(type: string, callback: () => void): void;
    setHeader(key: string, value: string): void;
    write(payload: Uint8Array): boolean;
    writeHead(status: number): void;
};
export declare type RequestListener = (request: RequestLike, response: ResponseLike) => Promise<void>;
export declare function serializeComponents(components: Array<string>): string;
export declare function extractKeyValuePairs(record: Record<string, Primitive>, exclude?: Array<string>): Array<[string, string]>;
export declare function combineKeyValuePairs(pairs: Array<[string, string]>): Record<string, Primitive>;
export declare function serializeParameters(parameters: Array<[string, string]>): string;
export declare function getOption(pairs: Iterable<[string, string]>, key: string): Primitive;
export declare function getParsedOption(pairs: Iterable<[string, string]>, key: string): Primitive;
export declare type RawRequest = {
    method: string;
    components: Array<string>;
    parameters: Array<[string, string]>;
    headers: Array<[string, string]>;
    payload: Binary;
};
export declare type Auxillary = {
    socket: RequestLike["socket"];
};
export declare type RawResponse = {
    status: number;
    headers: Array<[string, string]>;
    payload: Binary;
};
export declare type Endpoint = (raw: RawRequest, auxillary: Auxillary) => {
    acceptsComponents(): boolean;
    acceptsMethod(): boolean;
    validateRequest(): Promise<{
        handleRequest(): Promise<{
            validateResponse(): Promise<RawResponse>;
        }>;
    }>;
};
export declare function getComponents(url: string): Array<string>;
export declare function getParameters(url: string): Array<[string, string]>;
export declare function getHeaders(headers: Array<string>): Array<[string, string]>;
export declare type Payload = JSON | Binary;
export declare type CollectedPayload<A extends Payload> = A extends Binary ? Uint8Array : A;
export declare function isPayloadBinary(payload: Payload): payload is Binary;
export declare type EndpointRequest = {
    options?: Record<string, Primitive>;
    headers?: Record<string, Primitive>;
    payload?: Payload;
};
export declare type EndpointResponse = {
    status?: number;
    headers?: Record<string, Primitive>;
    payload?: Payload;
};
export declare class ClientRequest<A extends EndpointRequest> {
    private request;
    private auxillary;
    private collectedPayload?;
    constructor(request: A, auxillary: Auxillary);
    options(): {} & A["options"];
    headers(): {} & A["headers"];
    payload(): Promise<CollectedPayload<A["payload"]>>;
    socket(): Auxillary["socket"];
}
export declare class ServerResponse<A extends EndpointResponse> {
    private response;
    private collectedPayload?;
    constructor(response: A);
    status(): number;
    headers(): {} & A["headers"];
    payload(): Promise<CollectedPayload<A["payload"]>>;
}
export declare class EndpointError {
    private response;
    constructor(response: Partial<RawResponse>);
    getResponse(): RawResponse;
}
export declare type RequestMap<A extends RequestMap<A>> = {
    [B in keyof A]: EndpointRequest;
};
export declare type ResponseMap<A extends ResponseMap<A>> = {
    [B in keyof A]: EndpointResponse;
};
export declare type Client<A extends RequestMap<A>, B extends ResponseMap<B>> = {
    [C in keyof A & keyof B]: (request: A[C]) => Promise<ServerResponse<B[C]>>;
};
export declare type Server<A extends RequestMap<A>, B extends ResponseMap<B>> = {
    [C in keyof A & keyof B]: (request: ClientRequest<A[C]>) => Promise<B[C]>;
};
export declare function collectPayload(binary: Binary): Promise<Uint8Array>;
export declare function serializeStringPayload(string: string): Binary;
export declare function serializePayload(payload: JSON): Binary;
export declare function deserializeStringPayload(binary: Binary): Promise<string>;
export declare function deserializePayload(binary: Binary): Promise<JSON>;
export declare function finalizeResponse(raw: RawResponse, defaultContentType: string): RawResponse;
export declare function acceptsComponents(one: Array<string>, two: Array<[string, string]>): boolean;
export declare function acceptsMethod(one: string, two: string): boolean;
export declare type RequestHandler = (raw: RawRequest, urlPrefix?: string) => Promise<RawResponse>;
export declare function xhr(raw: RawRequest, urlPrefix?: string): Promise<RawResponse>;
export declare type NodeRequestHandlerOptions = Partial<Omit<import("https").RequestOptions, keyof import("http").RequestOptions>>;
export declare function makeNodeRequestHandler(options?: NodeRequestHandlerOptions): RequestHandler;
export declare function respond(httpResponse: ResponseLike, raw: RawResponse): Promise<void>;
export declare function combineRawHeaders(raw: Array<string>): Array<string>;
export declare function route(endpoints: Array<Endpoint>, httpRequest: RequestLike, httpResponse: ResponseLike, urlPrefix?: string): Promise<void>;
export declare function parseRangeHeader(value: Primitive, size: number): {
    status: number;
    offset: number;
    length: number;
    size: number;
};
export declare function getContentTypeFromExtension(extension: string): string | undefined;
export declare function makeReadStreamResponse(pathPrefix: string, pathSuffix: string, request: ClientRequest<EndpointRequest>): EndpointResponse & {
    payload: Binary;
};
