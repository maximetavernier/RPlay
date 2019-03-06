'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var IController = /** @class */ (function () {
    function IController(_serverConfigs, routePrefix) {
        if (routePrefix === void 0) { routePrefix = '/'; }
        this.router = require('express').Router();
        this.routePrefix = routePrefix;
        /*
        const confs: HttpClientConfigs = {
            protocol: serverConfigs.github.protocol,
            host: serverConfigs.github.host
        };

        const headers: Dictionary = new Dictionary([
            new Pair('Accept', 'application/json'),
        ]);

        this.httpClient = new HttpClientWrapper(confs, headers);
        */
        this.init();
    }
    IController.prototype.Router = function () {
        return this.router;
    };
    IController.prototype.getAuth = function (req) {
        return req.cookies['authToken'];
    };
    return IController;
}());
exports.default = IController;
