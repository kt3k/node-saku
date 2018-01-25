const { describe, it, context } = require('kocha')
const assert = require('assert')
const colo = require('colo')

const { cmd, exec } = require('./helper')

describe('cli', () => {
  describe('-s, --sequential option', () => {
    it('runs tasks in sequence', () => {
      const result = exec(`${cmd} -s hello world`)

      assert(result.includes(`Run ${colo.magenta('hello, world')} in ${colo.cyan('sequence')}`))
    })

    context('with -q option', () => {
      it('runs without additional log messages', () => {
        const result = exec(`${cmd} -sq hello world`)

        assert(!result.includes(`Run ${colo.magenta('hello, world')} in ${colo.cyan('series')}`))
      })
    })

    context('when the invalid task names are given', () => {
      it('exits with non-zero value', () => {
        assert.throws(() => {
          exec(`${cmd} -s hello wrrrld`)
        })
      })
    })

    context('with -p option', () => {
      it('exits with non-zero value', () => {
        assert.throws(() => {
          exec(`${cmd} -sp hello world`)
        })
      })
    })
  })
})
