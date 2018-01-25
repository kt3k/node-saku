const colo = require('colo')
const logger = require('../logger')

module.exports = async (argv, allTasks) => {
  const { cwd, parallel, quiet, race, sequential, _: taskNames } = argv

  if (quiet) {
    logger.quiet()
  }

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
