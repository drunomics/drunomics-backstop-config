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
        this.backstopJson.scenarios.forEach(function (scenario) {
            var parsedScenarioUrl = url.parse(scenario.url);
            var newUrl = '';
            if (_this.options.subsite && parsedScenarioUrl.host.indexOf('_') !== -1) {
                var parsedBaseUrl = url.parse(_this.options.baseUrl);
                var subsite = parsedScenarioUrl.host.substring(0, parsedScenarioUrl.host.indexOf('_'));
                var indexOfLocal = parsedBaseUrl.host.indexOf('.local');
                var indexOfCi = parsedBaseUrl.host.indexOf('.ci.drunomics.com');
                if (_this.options.dash && indexOfLocal !== -1) {
                    parsedBaseUrl.host = parsedBaseUrl.host.slice(0, indexOfLocal) + '-' + subsite + parsedBaseUrl.host.slice(indexOfLocal);
                }
                else {
                    var glue = indexOfCi !== -1 ? '_' : '.';
                    parsedBaseUrl.host = subsite + glue + parsedBaseUrl.host;
                }
                parsedBaseUrl.pathname = parsedScenarioUrl.pathname;
                parsedBaseUrl.search = parsedScenarioUrl.search;
                parsedBaseUrl.query = parsedScenarioUrl.query;
                parsedBaseUrl.hash = parsedScenarioUrl.hash;
                newUrl = url.format(parsedBaseUrl);
            }
            else {
                newUrl = _this.options.baseUrl + parsedScenarioUrl.path;
            }
            scenario.url = newUrl;
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