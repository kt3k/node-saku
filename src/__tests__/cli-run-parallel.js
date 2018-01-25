const { describe, it } = require('kocha')
const assert = require('assert')
const colo = require('colo')

const { cmd, exec } = require('./helper')

describe('cli', () => {
  describe('-p, --parallel option', () => {
    it('runs tasks in parallel', () => {
      const result = exec(`${cmd} -p hello world`)

      assert(result.includes(`Run ${colo.magenta('hello, world')} in ${colo.cyan('parallel')}`))
    })
  })
})
