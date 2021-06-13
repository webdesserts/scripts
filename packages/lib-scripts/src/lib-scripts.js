const { getEnv } = require('./env')
const { logger } = require('./logger')
const { subcommands, getSubcommandList } = require('./subcommands')

/**
 * The entry point for the lib scripts cli
 * 
 * @returns {Promise<void>}
 */
async function run() {
  const env = getEnv()
  const fn = subcommands[env.subcommand]

  if (!env.subcommand) {
    return subcommands.help(env)
  }

  if (!fn) {
    logger.error(`Unknown lib-script named "${env.subcommand}"`)
    logger.info(getSubcommandList())
    process.exit(1)
  }

  logger.info(`Executing lib-script "${env.subcommand}"`)
  logger.info()

  try {
    await fn(env)
  } catch(err) {
    logger.error(err)
    process.exit(1)
  }
}

module.exports = { run }