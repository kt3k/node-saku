const colo = require('colo')
const pkg = require('../package')

let quiet = false

exports.logSaku = (...args) => {
  exports.log(`${colo.cyan(`[${pkg.name}]`)}`, ...args)
}

exports.logPlus = message => {
  exports.log(`+${message}`)
}

exports.log = (...args) => {
  if (quiet) {
    return
  }

  console.log(...args)
}

exports.quiet = () => {
  quiet = true
}
