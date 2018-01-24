const { describe, it, context } = require('kocha')
const pkg = require('../../package')
const assert = require('assert')
const colo = require('colo')

const { dir, cmd, exec } = require('./helper')

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

      assert(result.includes(`There are ${colo.magenta(5)} tasks`))
      assert(result.includes('  [hello]'))
      assert(result.includes('  [world]'))
      assert(result.includes('  [parallel]'))
      assert(result.includes('  [serial]'))
      assert(result.includes('  [test]'))
    })

    context('when saku.md is not found', () => {
      it('exits with non-zero value', () => {
        assert.throws(() => {
          exec(`${cmd} -i`, { cwd: __dirname })
        })
      })
    })

    context('when saku.md has no task', () => {
      it('shows message saying there is no task', () => {
        const result = exec(`${cmd} -i`, { cwd: dir.noTask })

        assert(result.includes('No tasks'))
      })
    })

    context('when saku.md has 1 task', () => {
      it('shows message saying there is 1 task', () => {
        const result = exec(`${cmd} -i`, { cwd: dir.oneTask })
        assert(result.includes(`There is ${colo.magenta(1)} task`))
      })
    })
  })
})
