import * as url from "url";
import * as fs from "fs";
import * as exit from "exit";

export class Backstop {

  /**
   * JSON for backstop configuration.
   */
  backstopJson: any;

  /**
   * URL of page that should be tested
   */
  baseUrl: string;

  /**
   * Relative path to backstop configuration JSON.
   */
  backstopJsonPath: string;

  constructor(backstopJsonPath: string, baseUrl: string) {
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
  static init(backstopJsonPath: any, baseUrl: string) {
    let backstop = new Backstop(backstopJsonPath, baseUrl);
    backstop.init();
  }

  /**
   * Initialize backstop.
   */
  init() {
    this.backstopJson.scenarios.forEach((e) => {
      let currentUrl = url.parse(e.url);
      e.url = this.baseUrl + currentUrl.path;
    });
    this.saveBackstopJson();
  }

  /**
   * Gets backstop configuration JSON from given file.
   *
   * @returns {any}
   *   Backstop configuration JSON.
   */
  getBackstopJson() {
    if (!fs.existsSync(this.backstopJsonPath)) {
      console.error('Error: ' + this.backstopJsonPath + ' not found.');
      exit(1);
    }
    return JSON.parse(fs.readFileSync('backstop.json', 'utf8'))
  }

  /**
   * Saves backstop configuration JSON in given file.
   */
  saveBackstopJson() {
    fs.writeFileSync(this.backstopJsonPath, JSON.stringify(this.backstopJson, null, 2));
  }
}