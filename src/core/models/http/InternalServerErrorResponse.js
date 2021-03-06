"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HttpResponse_1 = require("./HttpResponse");
var InternalServerErrorResponse = /** @class */ (function (_super) {
    __extends(InternalServerErrorResponse, _super);
    function InternalServerErrorResponse(body) {
        return _super.call(this, 500, body) || this;
    }
    return InternalServerErrorResponse;
}(HttpResponse_1.default));
exports.default = InternalServerErrorResponse;
