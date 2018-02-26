#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Backstop_1 = require("./Backstop");
var exit = require("exit");
var argv = require('minimist')(process.argv.slice(2));
var options;
var baseUrl;
var subsite;
var dash;
var path;
var engine;
var mobilePrefix;
if (argv.u !== null) {
    baseUrl = argv.u;
}
if (argv.s !== null) {
    subsite = argv.s;
}
if (argv.d !== null) {
    dash = argv.d;
}
if (argv.p !== null) {
    path = argv.p;
}
if (argv.e !== null) {
    engine = argv.e;
}
if (argv.m !== null) {
    mobilePrefix = argv.m;
}
if (typeof baseUrl === 'undefined') {
    console.error('Error: Base URL missing.');
    exit(1);
}
if (typeof path === 'undefined') {
    console.log('Path not set, using "backstop.json"');
    path = 'backstop.json';
}
if (typeof engine === 'undefined') {
    console.log('Engine not set, using "phantomjs"');
    engine = 'phantomjs';
}
if (typeof mobilePrefix === 'undefined') {
    console.log('Engine not set, using "phantomjs"');
    mobilePrefix = 'm_';
}
options = {
    "baseUrl": baseUrl,
    "path": path,
    "engine": engine,
    "subsite": typeof subsite !== 'undefined',
    "dash": typeof dash !== 'undefined',
    "mobilePrefix": mobilePrefix
};
Backstop_1.Backstop.init(options);
//# sourceMappingURL=index.js.map