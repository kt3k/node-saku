#!/usr/bin/env node

const Cli = require('../src/cli')

require('minimisted')(argv => { new Cli(argv).main() }, {
  boolean: ['version', 'help'],
  alias: {
    v: 'version',
    h: 'help'
  }
})
