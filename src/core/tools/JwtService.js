"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Constants_1 = require("../Constants");
var Dictionary_1 = require("../lib/Dictionary");
var Pair_1 = require("../lib/Pair");
var Path_1 = require("../lib/Path");
var jwt = require('jsonwebtoken');
var JwtService = /** @class */ (function () {
    function JwtService() {
        this.keys = new Dictionary_1.default([
            new Pair_1.default('private', fs.readFileSync(Path_1.default.combine(Constants_1.default['KeysDirPath'], Constants_1.default['EncryptionPrivateKey']))),
            new Pair_1.default('public', fs.readFileSync(Path_1.default.combine(Constants_1.default['KeysDirPath'], Constants_1.default['DecryptionPublicKey'])))
        ]);
        this.passphrase = 'l3k1osk3';
    }
    JwtService.prototype.Decode = function (token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                jwt.verify(token, _this.keys['public'], { algorithms: ['RS256'] }, function (err, decoded) {
                    if (err) {
                        console.error("[JwtService.Decode] " + err.message);
                        reject();
                    }
                    else {
                        resolve(decoded);
                    }
                });
            }
            catch (_a) {
                reject();
            }
        });
    };
    JwtService.prototype.Encode = function (payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                jwt.sign(payload, { key: _this.keys['private'], passphrase: _this.passphrase }, { algorithm: 'RS256' }, function (err, encoded) {
                    if (err) {
                        console.error("[JwtService.Encode] " + err.message);
                        reject();
                    }
                    else {
                        resolve(encoded);
                    }
                });
            }
            catch (_a) {
                reject();
            }
        });
    };
    JwtService.prototype.GeneratePayload = function (username, auth) {
        var now = new Date();
        now.setDate(now.getDate() + 7);
        var payload = {
            username: username,
            auth: auth,
            exp: now.getTime(),
        };
        return payload;
    };
    return JwtService;
}());
exports.default = JwtService;
