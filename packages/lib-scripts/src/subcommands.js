const chalk = require("chalk")
const childProcess = require("child_process")
const { promisify } = require("util")
const { logger } = require("./logger")
const { indent } = require("./miscellaneous")
const { getProjectPaths } = require("./paths")

const spawn = promisify(childProcess.spawn)

/**
 * @typedef {import("./env").Env} Env
 */

/**
 * @type {{
 *   [key: string]: (env: Env) => Promise<void>
 * }}
 */
const subcommands = {
  async help () {
    const label = chalk.bold("USAGE")
    logger.info(`${label} app-scripts <command>`)
    logger.info(getSubcommandList())
  },

  async build () {
    const paths = getProjectPaths()
    await spawn(paths.tsc, [], { stdio: 'inherit' })
  },

  async dev () {
    const paths = getProjectPaths()
    await spawn(paths.tsc, [`--project`, `${paths.tsconfig}`, '--watch'], { stdio: 'inherit' })
  }
}

/**
 * @returns {string}
 */
function getSubcommandList() {
  let lines = []

  lines.push(``)
  lines.push(chalk.dim(`Commands:`))
  lines.push(``)
  let commands = Object.keys(subcommands).map(key => `${key}`).map(indent)
  lines = lines.concat(commands)
  lines.push(``)

  return lines.map(indent).join(`\n`)
}

module.exports = { subcommands, getSubcommandList }