export interface BackstopOptions {

  /**
   * URL of page that should be tested
   */
  "baseUrl": string,

  /**
   * Relative path to backstop configuration JSON.
   */
  "path": string,

  /**
   * Engine backstop should use.
   */
  "engine": string

  /**
   * Whether project has subsites.
   */
  "subsite": boolean
}
