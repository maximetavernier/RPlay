'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("./lib/Dictionary");
var Path_1 = require("./lib/Path");
var Constants = new Dictionary_1.default();
// Versions
Constants.push('Version', '1.0');
// File extensions
Constants.push('JsExt', '.js');
Constants.push('JsonExt', '.json');
Constants.push('ConfigExt', '.config');
Constants.push('LogExt', '.log');
// Architecture
Constants.push('ConfigDirPath', Path_1.default.combine(__dirname, '../configs'));
Constants.push('KeysDirPath', Path_1.default.combine(__dirname, '../keys'));
Constants.push('ControllersDirPath', Path_1.default.combine(__dirname, '../api/controllers'));
Constants.push('InterceptorsDirPath', Path_1.default.combine(__dirname, '../api/interceptors'));
Constants.push('AssetsDirPath', Path_1.default.combine(__dirname, '../views/assets'));
Constants.push('ScriptsDirPath', Path_1.default.combine(__dirname, '../views/scripts'));
Constants.push('JsDirPath', Path_1.default.combine(__dirname, '../views/js'));
Constants.push('StylesDirPath', Path_1.default.combine(__dirname, '../views/styles'));
// Specific files
Constants.push('RobotsFile', 'robots.txt');
// Jwt public & private keys, pass phrase is : 'l3k1osk3', algorythm is RSA/DES3
Constants.push('EncryptionPrivateKey', 'private.key');
Constants.push('DecryptionPublicKey', 'public.pem');
exports.default = Constants;
function get(key) {
    return Constants.get(key);
}
exports.get = get;
