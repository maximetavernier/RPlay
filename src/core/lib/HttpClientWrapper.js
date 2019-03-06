"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OkResponse_1 = require("../models/http/OkResponse");
var BadRequestResponse_1 = require("../models/http/BadRequestResponse");
var UnauthorizedResponse_1 = require("../models/http/UnauthorizedResponse");
var NotFoundResponse_1 = require("../models/http/NotFoundResponse");
var InternalServerErrorResponse_1 = require("../models/http/InternalServerErrorResponse");
var UnknownResponse_1 = require("../models/http/UnknownResponse");
var HttpClientConfigs_1 = require("../models/configs/HttpClientConfigs");
var Tools_1 = require("./Tools");
var axios = require('axios');
var HttpClientWrapper = /** @class */ (function () {
    function HttpClientWrapper(configs, headers) {
        var _this = this;
        this.configs = configs || new HttpClientConfigs_1.default();
        this.client = axios.create({
            baseURL: "" + this.configs.protocol + this.configs.host,
            timeout: 30000
        });
        if (headers)
            headers.forEach(function (header) {
                _this.client.defaults.headers.common[header.key] = header.value;
            });
    }
    HttpClientWrapper.prototype.get = function (endpoint, auth) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var opts = axios.defaults;
                if (!Tools_1.default.isNullOrUndefined(auth))
                    opts.headers['Authorization'] = "Basic " + decodeURIComponent(auth);
                _this.client.get(endpoint, opts).then(function (response) {
                    console.log("[HttpClient.get.then] " + response.status);
                    resolve(HttpClientWrapper.GetResponse(response.status, response.data));
                }).catch(function (error) {
                    console.error("[HttpClient.get.catch] " + error);
                    reject(new InternalServerErrorResponse_1.default());
                });
            }
            catch (error) {
                console.error("[HttpClient.get.exception]");
                reject(new InternalServerErrorResponse_1.default());
            }
        });
    };
    HttpClientWrapper.prototype.post = function (endpoint, data, auth) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var opts = axios.defaults;
                if (!Tools_1.default.isNullOrUndefined(auth))
                    opts.headers['Authorization'] = "Basic " + decodeURIComponent(auth);
                _this.client.post(endpoint, JSON.stringify(data), opts).then(function (response) {
                    console.log("[HttpClient.post.then] " + response.status);
                    resolve(HttpClientWrapper.GetResponse(response.status, response.data));
                }).catch(function (error) {
                    console.error("[HttpClient.post.catch] " + error);
                    reject(new InternalServerErrorResponse_1.default());
                });
            }
            catch (error) {
                console.error("[HttpClient.post.exception] " + error);
                reject(new InternalServerErrorResponse_1.default());
            }
        });
    };
    HttpClientWrapper.GetResponse = function (statusCode, body) {
        switch (statusCode) {
            case 200:
                return new OkResponse_1.default(body);
            case 400:
                return new BadRequestResponse_1.default(body);
            case 401:
                return new UnauthorizedResponse_1.default(body);
            case 404:
                return new NotFoundResponse_1.default(body);
            case 500:
                return new InternalServerErrorResponse_1.default(body);
            default:
                return new UnknownResponse_1.default(statusCode, body);
        }
    };
    return HttpClientWrapper;
}());
exports.default = HttpClientWrapper;
