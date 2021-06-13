const chalk = require("chalk")
const childProcess = require("child_process")
const { existsSync } = require('fs')
const { promisify } = require("util")
const { AppError } = require("./errors")
const { logger } = require("./logger")
const { indent } = require("./miscellaneous")
const { Paths } = require("./paths")

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
    validateProject()
    await spawn(Paths.tsc, [], { stdio: 'inherit' })
  },

  async dev () {
    validateProject()
    await spawn(Paths.tsc, [`--project`, `${Paths.tsconfig}`, '--watch'], { stdio: 'inherit' })
  }
}

/**
 * Makes sure all required files and folders are present
 */
function validateProject() {
  /**
   * @todo This error currently never gets hit because the it errors first trying to find
   * typescript in paths This error should probably take priority so lets clean then up
   * when we get the chance.
   */
  if (!existsSync(Paths.package)) {
    throw new AppError(`Unable to find package.json`, [
      `It looks like you're trying to run lib-scripts in an uninitialized project.`,
      "Please make sure you're in the correct directory and run `npm init` first."
    ])
  }

  if (!existsSync(Paths.tsconfig)) {
    throw new AppError(`Unable to find tsconfig.json`, [
      `lib-scripts requires a tsconfig.json to properly build.`,
      `Please add the a tsconfig.json with the following cotents:`,
      ``,
      `{ "extends": "./node_modules/@webdesserts/lib-scripts/lib.tsconfig.json" }`,
    ])
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