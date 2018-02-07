import * as url from "url";
import * as fs from "fs";
import * as exit from "exit";
import {BackstopOptions} from "./BackstopOptions";

export class Backstop {

  /**
   * JSON for backstop configuration.
   */
  backstopJson: any;

  /**
   * Options object.
   */
  options: BackstopOptions;

  constructor(options: BackstopOptions) {
    this.options = options;
    this.backstopJson = this.getBackstopJson();
  }

  /**
   * Initialize backstop.
   *
   * @param options
   */
  static init(options: BackstopOptions) {
    let backstop = new Backstop(options);
    backstop.init();
  }

  /**
   * Initialize backstop.
   */
  init() {
    this.setBaseUrl();
    this.setEngine();
    this.saveBackstopJson();
  }

  /**
   * Sets base url of pages that should be tested
   */
  setBaseUrl() {
    this.backstopJson.scenarios.forEach((scenario) => {
      let parsedScenarioUrl = url.parse(scenario.url);
      let newUrl = '';
      if (this.options.subsite && parsedScenarioUrl.host.indexOf('_') !== -1) {
        let parsedBaseUrl = url.parse(this.options.baseUrl);
        let subsite = parsedScenarioUrl.host.substring(0, parsedScenarioUrl.host.indexOf('_'));
        let indexOfLocal = parsedBaseUrl.host.indexOf('.local');
        let indexOfCi = parsedBaseUrl.host.indexOf('.ci.drunomics.com');

        if (this.options.dash && indexOfLocal !== -1) {
          parsedBaseUrl.host = parsedBaseUrl.host.slice(0, indexOfLocal) + '-' + subsite +  parsedBaseUrl.host.slice(indexOfLocal);
        }
        else {
          let glue = indexOfCi !== -1 ? '_' : '.';
          parsedBaseUrl.host = subsite + glue + parsedBaseUrl.host;
        }
        parsedBaseUrl.pathname = parsedScenarioUrl.pathname;
        newUrl = url.format(parsedBaseUrl);
      }
      else {
        newUrl = this.options.baseUrl + parsedScenarioUrl.path;
      }
      scenario.url = newUrl;
    });
  }

  /**
   * Sets engine.
   */
  setEngine() {
    this.backstopJson.engine = this.options.engine;
  }

  /**
   * Gets backstop configuration JSON from given file.
   *
   * @returns {}
   *   Backstop configuration JSON.
   */
  getBackstopJson() {
    if (!fs.existsSync(this.options.path)) {
      console.error('Error: ' + this.options.path + ' not found.');
      exit(1);
    }
    return JSON.parse(fs.readFileSync(this.options.path, 'utf8'))
  }

  /**
   * Saves backstop configuration JSON in given file.
   */
  saveBackstopJson() {
    fs.writeFileSync(this.options.path, JSON.stringify(this.backstopJson, null, 2));
  }
}