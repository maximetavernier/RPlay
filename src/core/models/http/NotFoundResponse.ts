import HttpResponse from "./HttpResponse";

export default class NotFoundResponse extends HttpResponse {
    constructor(body?: any) {
        super(404, body);
    }
}