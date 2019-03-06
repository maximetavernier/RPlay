"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpResponse = /** @class */ (function () {
    function HttpResponse(statusCode, body) {
        this.statusCode = statusCode;
        this.body = body;
    }
    return HttpResponse;
}());
exports.default = HttpResponse;
