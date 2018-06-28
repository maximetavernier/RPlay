import HttpResponse from "./HttpResponse";

export default class UnknownResponse extends HttpResponse {
    constructor(statusCode: number, body?: string) {
        super(statusCode, body);
    }
}