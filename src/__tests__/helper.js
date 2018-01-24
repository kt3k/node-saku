require('espower-loader')({ pattern: '{src,test}/**/*.js' })

const { execSync } = require('child_process')
const { join } = require('path')

const execOpts = { cwd: join(__dirname, '..', '__fixture__') }

exports.cmd = `node ${join(__dirname, '..', '..', 'bin', 'saku')}`

/**
 * @param {string} cmd The command
 * @param {Object} opts The options
 */
exports.exec = (cmd, opts) => execSync(cmd, Object.assign({}, execOpts, opts)).toString()
