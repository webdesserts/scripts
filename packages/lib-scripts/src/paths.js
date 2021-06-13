const path = require('path')

const Paths = {
  root: path.resolve('./'),
  package: path.resolve('./package.json'),
  tsconfig: path.resolve('./tsconfig.json'),
  typescript: require.resolve('typescript', { paths: [path.resolve('./')] }),
  tsc: require.resolve('typescript/bin/tsc', { paths: [path.resolve('./')] })
}

module.exports = { Paths }