const { describe, it } = require('kocha')
const { execSync } = require('child_process')
const pkg = require('../../package')
const assert = require('assert')
const { join } = require('path')
const colo = require('colo')

const execOpts = { cwd: join(__dirname, '..', '__fixture__') }
const cmd = `node ${join(__dirname, '..', '..', 'bin', 'saku')}`
const exec = cmd => execSync(cmd, execOpts).toString()

describe('cli', () => {
  describe('-v, --version option', () => {
    it('shows the version number', () => {
      assert(exec(`${cmd} -v`).includes(`${pkg.name}@${pkg.version}`))
    })
  })

  describe('-h, --help option', () => {
    it('shows the help message', () => {
      const result = exec(`${cmd} -h`)

      assert(result.includes('Usage:'))
      assert(result.includes('Options:'))
      assert(result.includes('-v, --version'))
      assert(result.includes('-h, --help'))
    })
  })

  describe('-i, --info option', () => {
    it('shows the help message', () => {
      const result = exec(`${cmd} -i`)

      assert(result.includes('  [hello]'))
      assert(result.includes('  [parallel]'))
      assert(result.includes('  [serial]'))
      assert(result.includes('  [test]'))
    })
  })

  describe('-s, --sequential option', () => {
    it('runs tasks in sequence', () => {
      const result = exec(`${cmd} -s hello world`)

      assert(result.includes(`Run ${colo.magenta('hello, world')} in ${colo.cyan('series')}`))
    })
  })

  describe('-p, --parallel option', () => {
    it('runs tasks in parallel', () => {
      const result = exec(`${cmd} -p hello world`)

      assert(result.includes(`Run ${colo.magenta('hello, world')} in ${colo.cyan('parallel')}`))
    })
  })
})
