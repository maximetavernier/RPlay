import HttpResponse from "./HttpResponse";

export default class BadRequestResponse extends HttpResponse {
    constructor(body?: any) {
        super(400, body);
    }
}