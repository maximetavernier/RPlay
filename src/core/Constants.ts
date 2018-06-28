'use strict';

import Dictionary from './lib/Dictionary';
import Path from './lib/Path';

var Constants = new Dictionary();

// Versions
Constants.push('Version', '1.0');
// File extensions
Constants.push('JsExt', '.js');
Constants.push('JsonExt', '.json');
Constants.push('ConfigExt', '.config');
Constants.push('LogExt', '.log');
// Architecture
Constants.push('ConfigDirPath', Path.combine(__dirname, '../configs'));
Constants.push('KeysDirPath', Path.combine(__dirname, '../keys'));

Constants.push('ControllersDirPath', Path.combine(__dirname, '../api/controllers'));
Constants.push('InterceptorsDirPath', Path.combine(__dirname, '../api/interceptors'));

Constants.push('AssetsDirPath', Path.combine(__dirname, '../views/assets'));
Constants.push('ScriptsDirPath', Path.combine(__dirname, '../views/scripts'));
Constants.push('JsDirPath', Path.combine(__dirname, '../views/js'));
Constants.push('StylesDirPath', Path.combine(__dirname, '../views/styles'));

// Specific files
Constants.push('RobotsFile', 'robots.txt');
// Jwt public & private keys, pass phrase is : 'l3k1osk3', algorythm is RSA/DES3
Constants.push('EncryptionPrivateKey', 'private.key');
Constants.push('DecryptionPublicKey', 'public.pem');

export default Constants;
export function get(key: string): any {
    return Constants.get(key);
}