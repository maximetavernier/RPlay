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
var Constants_1 = require("../../core/Constants");
var Path_1 = require("../../core/lib/Path");
var IController_1 = require("./IController");
var Map = /** @class */ (function (_super) {
    __extends(Root, _super);
    function Root(servConfigs) {
        return _super.call(this, servConfigs) || this;
    }
    Root.prototype.init = function () {
        this.router.get('/', this.root.bind(this));
        this.router.get('/robots.txt', this.robot.bind(this));
        this.router.get('/login', this.login.bind(this));
    };
    Root.prototype.root = function (req, res, _next) {
        if (req && res) {
            res.render('index');
        }
    };
    Root.prototype.robot = function (req, res, _next) {
        if (req && res)
            res.sendFile(Path_1.default.combine(Constants_1.default['ConfigDirPath'], Constants_1.default['RobotsFile']));
    };
    Root.prototype.login = function (req, res, _next) {
        if (req && res) {
        }
    };
    return Root;
}(IController_1.default));
exports.default = Map;
