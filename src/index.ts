#! /usr/bin/env node
import {Backstop} from "./Backstop";
import * as exit from "exit";
import {BackstopOptions} from "./BackstopOptions";

let argv = require('minimist')(process.argv.slice(2));
let options: BackstopOptions;
let baseUrl: string;
let subsite: boolean;
let dash: boolean;
let path: string;
let engine: string;
let mobilePrefix: string;

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

Backstop.init(options);



