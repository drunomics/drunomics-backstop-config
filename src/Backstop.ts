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
    this.backstopJson.scenarios.forEach((e) => {
      let currentUrl = url.parse(e.url);
      e.url = this.options.baseUrl + currentUrl.path;
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