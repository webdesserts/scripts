const { existsSync } = require('fs')
const { resolve: resolvePath } = require('path')
const { AppError } = require('./errors')
const { indent } = require('./miscellaneous')

/**
 * Tries to resolve a require path according the the project root. If the resolve
 * fails, returns null.
 * @param {string} path
 * @returns {string | null}
 */
function resolveProjectModulePath(path) {
  try {
    return require.resolve(path, { paths: [resolvePath('./')] })
  } catch (err) {
    return null
  }
}

/**
 * Finds and verifies the locations for all files, folders, and modules needed
 * for lib-scripts to run.
 */
function getProjectPaths() {
  const root = resolvePath('./')
  const packageConfig = resolvePath('./package.json')
  const tsconfig = resolvePath('./tsconfig.json')
  const typescript = resolveProjectModulePath('typescript')
  const tsc = resolveProjectModulePath('typescript/bin/tsc')

  if (!existsSync(packageConfig)) {
    throw new AppError(`Unable to find package.json`, [
      `It looks like you're trying to run lib-scripts in an uninitialized project.`,
      `Please make sure you're in the correct directory and one of the following commands first:`,
      ``,
      indent(`yarn init`),
      indent(`npm init`),
    ])
  }

  if (!typescript || !tsc) {
    throw new AppError(`typescript is not installed`, [
      `lib-script uses typescript to build your project (even pure js projects).`,
      `Please run one of the following commands to install the latest version:`,
      ``,
      indent(`yarn add --dev typescript`),
      indent(`npm install --save-dev typescript`),
    ])
  }

  if (!existsSync(tsconfig)) {
    throw new AppError(`Unable to find tsconfig.json`, [
      `lib-scripts requires a tsconfig.json to properly build.`,
      `Please add a tsconfig.json with the following cotents:`,
      ``,
      indent(`{ "extends": "./node_modules/@webdesserts/lib-scripts/lib.tsconfig.json" }`),
    ])
  }

  return { root, packageConfig, tsconfig, typescript, tsc }
}

module.exports = { getProjectPaths }