'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Path = /** @class */ (function () {
    function Path() {
    }
    Path.combine = function (root, path) {
        // Check params
        if (root === undefined || root.length <= 0)
            return (path === undefined || path.length <= 0) ? '/' : path;
        if (path === undefined || path.length <= 0)
            return (root === undefined || root.length <= 0) ? '/' : root;
        // Clean params
        if (root.charAt(root.length - 1) === '/')
            root = root.substr(0, root.length - 1);
        if (path.charAt(0) === '/')
            path = path.substr(1, path.length - 1);
        var dirs = root.split('/').concat(path.split('/'));
        // Combine
        var index = -1;
        while ((index = dirs.indexOf('.')) >= 0) {
            dirs.splice(index, 1);
        }
        while ((index = dirs.indexOf('..')) >= 0) {
            dirs.splice(index > 0 ? index - 1 : index, index > 0 ? 2 : 1);
        }
        // Concat
        var result = "";
        dirs.forEach(function (dir, index) {
            result = result.concat(dir, index === dirs.length - 1 ? '' : '/');
        });
        return result;
    };
    return Path;
}());
exports.default = Path;
