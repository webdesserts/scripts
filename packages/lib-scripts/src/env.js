const parseArgs = require("minimist");

/**
 * @typedef {'development' | 'production'} Mode
 */
const MODES = ["development", "production"];

/**
 * @param {string | undefined} value
 * @returns {value is Mode}
 */
function isMode(value) {
  return typeof value === "string" && MODES.includes(value);
}

/**
 * @typedef {{
 *   subcommand: string,
 *   mode: 'development' | 'production',
 *   isDev: boolean,
 *   isProd: boolean
 * }} Env
 */

/**
 * @returns {Env}
 */
function getEnv() {
  const argv = parseArgs(process.argv.slice(2), {
    boolean: ["debug"],
  });
  const [subcommand] = argv._;
  const mode = getMode(argv.debug);

  return {
    subcommand,
    mode,
    isDev: mode === "development",
    isProd: mode === "production",
  };
}

/**
 * @param {boolean} debug
 * @returns {Mode}
 */
function getMode(debug) {
  if (debug) return "development";

  const mode = process.env["MODE"];

  if (isMode(mode)) {
    return mode;
  } else {
    return "production";
  }
}

module.exports = { getEnv };
