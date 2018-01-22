const { select } = require('action-selector')

const pkg = require('../package')
const CLI_NAME = pkg.name

class Cli {
  constructor (argv) {
    this.argv = argv
    this.cliName = CLI_NAME
  }

  main () {
    const {
      version,
      help,
      info,
      _: tasks
    } = this.argv

    select(this, {
      version,
      help,
      info: info || tasks.length === 0,
      run: true
    }).on('action', action => action.call(this))
  }

  /**
   * Shows the version number
   */
  'action:version' () {
    console.log(`${pkg.name}@${pkg.version}`)
  }

  'action:help' () {
    console.log(`
Usage: ${this.cliName} [options] <task, ...>

Options:
  -v, --version       Shows the version number and exits.
  -h, --help          Shows the help message and exits.
  -i, --info          Shows the task information and exits.
  -p, --parallel      Runs tasks in parallel. Default false.
  -s, --serial        Runs tasks in serial. Default true.
`.trim())
  }

  /**
   * Shows the task information
   */
  'action:info' () {
    console.log('action:info')
  }

  /**
   * Runs the tasks
   */
  'action:run' () {
    console.log('action:run')
  }
}

module.exports = Cli
