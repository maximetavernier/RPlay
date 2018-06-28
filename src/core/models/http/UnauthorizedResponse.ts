import HttpResponse from "./HttpResponse";

export default class UnauthorizedResponse extends HttpResponse {
    constructor(body?: any) {
        super(401, body);
    }
}