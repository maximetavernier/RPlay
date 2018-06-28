import HttpResponse from "./HttpResponse";

export default class InternalServerErrorResponse extends HttpResponse {
    constructor(body?: any) {
        super(500, body);
    }
}