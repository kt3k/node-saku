#!/usr/bin/env node

const Cli = require('../src/cli')

require('minimisted')(
  argv => {
    new Cli(argv).main()
  },
  {
    string: ['config'],
    boolean: [
      'version',
      'help',
      'info',
      'parallel',
      'sequential',
      'race',
      'quiet'
    ],
    alias: {
      v: 'version',
      h: 'help',
      i: 'info',
      c: 'config',
      s: 'sequential',
      p: 'parallel',
      q: 'quiet',
      r: 'race'
    }
  }
)
