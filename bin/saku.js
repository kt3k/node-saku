#!/usr/bin/env node

const Cli = require('../src/cli')

require('minimisted')(argv => { new Cli(argv).main() }, {
  string: ['cwd'],
  boolean: ['version', 'help', 'info', 'parallel', 'sequential'],
  alias: {
    v: 'version',
    h: 'help',
    i: 'info',
    s: 'sequential',
    p: 'parallel'
  }
})
