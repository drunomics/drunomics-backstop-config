#! /usr/bin/env node
"use strict";
exports.__esModule = true;
var Backstop_1 = require("./Backstop");
var exit = require("exit");
var baseUrl;
var path;
// Check for url argument.
process.argv.forEach(function (val, index, array) {
    if (val.match('^url=.*$')) {
        baseUrl = val.substr(4);
    }
    else if (val.match('^path=.*$')) {
        path = val.substr(5);
    }
});
if (typeof baseUrl === 'undefined') {
    console.error('Error: Base URL missing.');
    exit(1);
}
if (typeof path === 'undefined') {
    console.log('Path not set, using "backstop.json"');
    path = 'backstop.json';
}
Backstop_1.Backstop.init(path, baseUrl);
//# sourceMappingURL=index.js.map