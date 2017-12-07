"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
var fs = require("fs");
var exit = require("exit");
var Backstop = (function () {
    function Backstop(options) {
        this.options = options;
        this.backstopJson = this.getBackstopJson();
    }
    Backstop.init = function (options) {
        var backstop = new Backstop(options);
        backstop.init();
    };
    Backstop.prototype.init = function () {
        this.setBaseUrl();
        this.setEngine();
        this.saveBackstopJson();
    };
    Backstop.prototype.setBaseUrl = function () {
        var _this = this;
        this.backstopJson.scenarios.forEach(function (e) {
            var currentUrl = url.parse(e.url);
            e.url = _this.options.baseUrl + currentUrl.path;
        });
    };
    Backstop.prototype.setEngine = function () {
        this.backstopJson.engine = this.options.engine;
    };
    Backstop.prototype.getBackstopJson = function () {
        if (!fs.existsSync(this.options.path)) {
            console.error('Error: ' + this.options.path + ' not found.');
            exit(1);
        }
        return JSON.parse(fs.readFileSync(this.options.path, 'utf8'));
    };
    Backstop.prototype.saveBackstopJson = function () {
        fs.writeFileSync(this.options.path, JSON.stringify(this.backstopJson, null, 2));
    };
    return Backstop;
}());
exports.Backstop = Backstop;
//# sourceMappingURL=Backstop.js.map