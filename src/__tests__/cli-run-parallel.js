const { describe, it, context } = require('kocha')
const assert = require('assert')
const colo = require('colo')

const { cmd, exec } = require('./helper')

describe('cli', () => {
  describe('-p, --parallel option', () => {
    it('runs tasks in parallel', () => {
      const result = exec(`${cmd} -p hello world`)

      assert(result.includes(`Run ${colo.magenta('hello, world')} in ${colo.cyan('parallel')}`))
    })

    context('with -r, --race option', () => {
      it('runs the tasks and exits when the first one finished', () => {
        const result = exec(`${cmd} -pr sleep-1-then-foo sleep-2-then-bar`)

        assert(result.includes(`Run ${colo.magenta('sleep-1-then-foo, sleep-2-then-bar')} in ${colo.cyan('parallel-race')}`))
        assert(result.includes('foo'))
        assert(!result.includes('bar'))
      })
    })
  })
})
