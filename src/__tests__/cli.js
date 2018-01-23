const { describe, it } = require('kocha')
const { execSync } = require('child_process')
const pkg = require('../../package')
const assert = require('assert')
const { join } = require('path')

const execOpts = { cwd: join(__dirname, '..', '__fixture__') }
const cmd = `node ${join(__dirname, '..', '..', 'bin', 'saku')}`

describe('cli', () => {
  describe('-v, --version option', () => {
    it('shows the version number', () => {
      assert(execSync(`${cmd} -v`, execOpts).includes(`${pkg.name}@${pkg.version}`))
    })
  })

  describe('-h, --help option', () => {
    it('shows the help message', () => {
      const result = execSync(`${cmd} -h`, execOpts)
      assert(result.includes('Usage:'))
      assert(result.includes('Options:'))
      assert(result.includes('-v, --version'))
      assert(result.includes('-h, --help'))
    })
  })

  describe('-i, --info option', () => {
  })

  describe('-s, --sequential option', () => {
  })

  describe('-p, --parallel option', () => {
  })
})
