#! /usr/bin/env node
import {Backstop} from "./Backstop";
import * as exit from "exit";

let baseUrl;
let path;

// Check for url argument.
process.argv.forEach(function (val, index, array) {
  if (val.match('^url=.*$')) {
    baseUrl = val.substr(4)
  }
  else if(val.match('^path=.*$')) {
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

Backstop.init(path, baseUrl);



