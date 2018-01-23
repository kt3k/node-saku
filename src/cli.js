const { select } = require('action-selector')
const parse = require('./parse-markdown')
const fs = require('fs')
const colo = require('colo')
const logger = require('./logger')

const actionInfo = require('./actions/info')

const pkg = require('../package')
const CLI_NAME = pkg.name
const TASK_FILENAME = 'saku.md'

class Cli {
  constructor (argv) {
    this.argv = argv
    this.cliName = CLI_NAME
  }

  main () {
    const { version, help, info, _: tasks } = this.argv

    select(this, {
      version,
      help,
      info: info || tasks.length === 0,
      run: true
    }).on('action', async action => {
      try {
        await action.call(this)
      } catch (e) {
        console.log(e.stack)
      }
    })
  }

  /**
   * Shows the version number
   */
  'action:version' () {
    console.log(`${pkg.name}@${pkg.version}`)
  }

  'action:help' () {
    this['action:version']()
    console.log(`
Usage: ${colo.cyan(this.cliName)} [options] <task, ...>

Options:
  -v, --version   - - Shows the version number and exits.
  -h, --help  - - - - Shows the help message and exits.
  -i, --info  - - - - Shows the task information and exits.
  -p, --parallel  - - Runs tasks in parallel. Default false.
  -s, --serial    - - Runs tasks in serial. Default true.
  --cwd <path>    - - Sets the current directory.
  -r, --race    - - - Set the flag to kill all tasks when a task
                      finished with zero. This option is valid only
                      with 'parallel' option.
  -q, --quiet     - - Stops the logging.
`)
  }

  /**
   * Shows the task information
   */
  'action:info' () {
    this['action:version']()

    console.log()

    actionInfo(parse(this.getTaskFile()))
  }

  getTaskFile () {
    try {
      return fs.readFileSync(TASK_FILENAME)
    } catch (e) {
      console.log(`${colo.red('Error')}: ${TASK_FILENAME} not found`)
      process.exit(1)
    }
  }

  /**
   * Runs the tasks
   */
  async 'action:run' () {
    const { cwd, parallel, quiet, race, sequential, _: taskNames } = this.argv

    if (quiet) {
      logger.quiet()
    }

    const allTasks = parse(this.getTaskFile())

    taskNames.forEach(name => {
      if (!allTasks.isValidTaskName(name)) {
        console.log(`${colo.red('Error')}: Invalid task name: "${name}"`)
        process.exit(1)
      }
    })

    const tasks = allTasks.filterByNames(taskNames)
    const names = tasks.taskNames.join(', ')

    tasks.on('task', ({ task: { name }, command }) => {
      logger.logPlus(command)
    })

    if (parallel && sequential) {
      console.log(
        `${colo.red('Error')}: both --parallel and --sequential are set`
      )
      process.exit(1)
    }

    if (parallel && race) {
      logger.logSaku(`Run ${colo.magenta(names)} in ${colo.cyan('parallel')}`)
      await tasks.runInRace({ cwd })
      logger.logSaku(
        `Finish ${colo.magenta(names)} in ${colo.cyan('parallel')}`
      )
    } else if (parallel) {
      logger.logSaku(`Run ${colo.magenta(names)} in ${colo.cyan('parallel')}`)
      await tasks.runParallel({ cwd })
      logger.logSaku(
        `Finish ${colo.magenta(names)} in ${colo.cyan('parallel')}`
      )
    } else {
      logger.logSaku(`Run ${colo.magenta(names)} in ${colo.cyan('series')}`)
      await tasks.runSequential({ cwd })
      logger.logSaku(`Finish ${colo.magenta(names)} in ${colo.cyan('series')}`)
    }
  }
}

module.exports = Cli
