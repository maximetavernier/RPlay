"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeRSA = require("node-rsa");
var EncryptionService = /** @class */ (function () {
    function EncryptionService() {
        this.key = new NodeRSA({ b: 2048 });
        this.key.setOptions({
            environment: 'node',
            encryptionScheme: 'pkcs1',
            signingScheme: 'pkcs1-sha256'
        });
    }
    EncryptionService.prototype.Decode = function (token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                resolve(_this.key.decryptPublic(token, 'utf8'));
            }
            catch (_a) {
                reject();
            }
        });
    };
    EncryptionService.prototype.Encode = function (text) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                resolve(_this.key.encryptPrivate(text, 'base64'));
            }
            catch (_a) {
                reject();
            }
        });
    };
    return EncryptionService;
}());
exports.default = EncryptionService;
