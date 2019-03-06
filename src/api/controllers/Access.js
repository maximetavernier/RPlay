'use strict';
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
var IController_1 = require("./IController");
var JwtService_1 = require("../../core/tools/JwtService");
var EncryptionService_1 = require("../../core/tools/EncryptionService");
var Access = /** @class */ (function (_super) {
    __extends(Access, _super);
    function Access(servConfigs) {
        var _this = _super.call(this, servConfigs, '/access') || this;
        _this.jwtService = new JwtService_1.default();
        _this.encryptionService = new EncryptionService_1.default();
        return _this;
    }
    Access.prototype.init = function () {
        this.router.get(this.routePrefix + "/authorization", this.getAuthorization.bind(this));
        this.router.post(this.routePrefix + "/login", this.login.bind(this));
    };
    Access.prototype.getAuthorization = function (req, res, _next) {
        var _this = this;
        var authToken = undefined;
        if (req && req.cookies) {
            authToken = this.getAuth(req);
        }
        else {
            console.error('[Access.Authorization] No jwt token found');
        }
        if (res) {
            if (authToken) {
                this.jwtService.Decode(authToken).then(function (payload) {
                    _this.encryptionService.Decode(payload.auth).then(function (auth) {
                        _this.httpClient.get('/user', auth).then(function (response) {
                            res.status(response.statusCode).end();
                        }).catch(function () {
                            console.error('[Access.Authorization] Auth token is not valid');
                            res.status(403).end();
                        });
                    }).catch(function () {
                        console.error('[Access.Authorization] Cannot decode auth token');
                        res.status(404).end();
                    });
                }).catch(function () {
                    console.error('[Access.Authorization] Cannot decode jwt');
                    res.status(400).end();
                });
            }
            else {
                res.status(401).end();
            }
        }
    };
    Access.prototype.login = function (req, res, _next) {
        //let auth: string | undefined;
        if (req && req.body) {
            //auth = new Buffer(`${req.body.username}:${req.body.password}`).toString('base64');
        }
        else {
            console.log('[Access.Login] Unable to retrieve request object or body');
        }
        if (res) {
        }
    };
    return Access;
}(IController_1.default));
exports.default = Access;
