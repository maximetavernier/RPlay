'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Pair_1 = require("./Pair");
var Dictionary = /** @class */ (function () {
    function Dictionary(dico) {
        var _this = this;
        this._keys = [];
        this._values = [];
        this._pairs = [];
        if (dico !== undefined && dico.length > 0) {
            dico.forEach(function (entry) {
                _this.push(entry.key, entry.value);
            });
        }
    }
    Dictionary.prototype.push = function (key, value) {
        this[key] = value;
        this._pairs.push(new Pair_1.default(key, value));
        this._keys.push(key);
        this._values.push(value);
    };
    Dictionary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key, 0);
        this._pairs.splice(index, 1);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    };
    Dictionary.prototype.indexOfKey = function (key, fromIndex) {
        return this._keys.indexOf(key, fromIndex);
    };
    Dictionary.prototype.indexOfValue = function (value, fromIndex) {
        return this._values.indexOf(value, fromIndex);
    };
    Dictionary.prototype.keys = function () {
        return this._keys;
    };
    Dictionary.prototype.get = function (key) {
        return this.containsKey(key) ? this._values[this._keys.indexOf(key)] : undefined;
    };
    Dictionary.prototype.containsKey = function (key) {
        return !(typeof this[key] === "undefined");
    };
    Dictionary.prototype.forEach = function (callbackfn, thisArg) {
        this._pairs.forEach(callbackfn, thisArg);
    };
    Dictionary.prototype.count = function () {
        return this._pairs.length;
    };
    Dictionary.prototype.clear = function () {
        this._keys.splice(0, this._keys.length);
        this._values.splice(0, this._values.length);
        this._pairs.splice(0, this._pairs.length);
    };
    Dictionary.prototype.isEmpty = function () {
        return this._keys.length === 0;
    };
    Dictionary.prototype.toLookup = function () {
        return this;
    };
    return Dictionary;
}());
exports.default = Dictionary;
