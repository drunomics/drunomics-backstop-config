"use strict";
exports.__esModule = true;
var url = require("url");
var fs = require("fs");
var exit = require("exit");
var Backstop = (function () {
    function Backstop(backstopJsonPath, baseUrl) {
        this.backstopJsonPath = backstopJsonPath;
        this.backstopJson = this.getBackstopJson();
        this.baseUrl = baseUrl;
    }
    /**
     * Initialize backstop.
     *
     * @param backstopJsonPath
     * @param {string} baseUrl
     */
    Backstop.init = function (backstopJsonPath, baseUrl) {
        var backstop = new Backstop(backstopJsonPath, baseUrl);
        backstop.init();
    };
    /**
     * Initialize backstop.
     */
    Backstop.prototype.init = function () {
        var _this = this;
        this.backstopJson.scenarios.forEach(function (e) {
            var currentUrl = url.parse(e.url);
            e.url = _this.baseUrl + currentUrl.path;
        });
        this.saveBackstopJson();
    };
    /**
     * Gets backstop configuration JSON from given file.
     *
     * @returns {any}
     *   Backstop configuration JSON.
     */
    Backstop.prototype.getBackstopJson = function () {
        if (!fs.existsSync(this.backstopJsonPath)) {
            console.error('Error: ' + this.backstopJsonPath + ' not found.');
            exit(1);
        }
        return JSON.parse(fs.readFileSync('backstop.json', 'utf8'));
    };
    /**
     * Saves backstop configuration JSON in given file.
     */
    Backstop.prototype.saveBackstopJson = function () {
        fs.writeFileSync(this.backstopJsonPath, JSON.stringify(this.backstopJson, null, 2));
    };
    return Backstop;
}());
exports.Backstop = Backstop;
//# sourceMappingURL=Backstop.js.map