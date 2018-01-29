const { describe, it, context } = require('kocha')
const assert = require('assert')
const colo = require('colo')

const { cmd, exec } = require('./helper')

describe('cli', () => {
  describe('error task', () => {
    context('-p, --parallel option', () => {
      it('stops other tasks when the first one errored', () => {
        try {
          exec(`${cmd} -p sleep-1-then-foo error`)
        } catch (e) {
          const result = e.stdout.toString()

          assert(result.includes('+sleep 1'))
          assert(result.includes('+no-command'))
          assert(result.includes(`${colo.red('Error')}: task ${colo.magenta('error')} failed`))
          assert(!result.includes('+echo foo'))
        }
      })
    })

    context('-pr, --parallel --race option', () => {
      it('stops other tasks when the first one errored', () => {
        try {
          exec(`${cmd} -pr sleep-1-then-foo error`)
        } catch (e) {
          const result = e.stdout.toString()

          assert(result.includes('+sleep 1'))
          assert(result.includes('+no-command'))
          assert(result.includes(`${colo.red('Error')}: task ${colo.magenta('error')} failed`))
          assert(!result.includes('+echo foo'))
        }
      })
    })
  })
})
