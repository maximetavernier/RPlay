import HttpResponse from "./HttpResponse";

export default class OkResponse extends HttpResponse {
    constructor(body?: any) {
        super(200, body);
    }
}