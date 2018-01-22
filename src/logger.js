const colo = require('colo')
const pkg = require('../package')

exports.log = (...args) => {
  console.log(`${colo.cyan(`[${pkg.name}]`)}`, ...args)
}
