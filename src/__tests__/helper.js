require('espower-loader')({ pattern: '{src,test}/**/*.js' })

const { execSync } = require('child_process')
const { join } = require('path')

const dir = {}
dir.default = join(__dirname, '..', '__fixture__')
dir.noTask = join(dir.default, 'example-no-task')
dir.oneTask = join(dir.default, 'example-1-task')

exports.dir = dir

const execOpts = { cwd: dir.default }

exports.cmd = `node ${join(__dirname, '..', '..', 'bin', 'saku')}`

/**
 * @param {string} cmd The command
 * @param {Object} opts The options
 */
exports.exec = (cmd, opts) => execSync(cmd, Object.assign({}, execOpts, opts)).toString()
