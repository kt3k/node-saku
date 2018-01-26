const path = require('path')
const colo = require('colo')
const logger = require('../logger')
const { prependEmoji } = require('../util/emoji')

module.exports = async (argv, allTasks, { cwd }) => {
  const { parallel, quiet, race, sequential, _: taskNames } = argv

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

  logStart(names, tasks.length, parallel, race)

  if (parallel && race) {
    await tasks.runInRace({ cwd })
  } else if (parallel) {
    await tasks.runParallel({ cwd })
  } else {
    await tasks.runSequential({ cwd })
  }

  logFinish(names, tasks.length, parallel, race)
}

/**
 * Logs the phase of the task execution
 * @param {string} phasePhrase The phrase to express the phase
 * @param {string} names The task names
 * @param {number} num The number of tasks
 * @param {boolean} isParallel
 * @param {boolean} isRace
 */
const logPhase = (phasePhrase, names, num, isParallel, isRace) => {
  logger.logSaku(`${phasePhrase}${colo.magenta(names)}${labelConcurrency(num, isParallel, isRace)}`)
}

const logStart = (names, num, isParallel, isRace) => {
  const phase = 'Run '

  logPhase(phase, names, num, isParallel, isRace)
}

const logFinish = (names, num, isParallel, isRace) => {
  const phase = prependEmoji('✨', 'Finish ')

  logPhase(phase, names, num, isParallel, isRace)
}

const labelConcurrency = (num, isParallel, isRace) => {
  if (num === 1) {
    return ''
  } else if (isParallel && isRace) {
    return ` in ${colo.cyan('parallel-race')}`
  } else if (isParallel) {
    return ` in ${colo.cyan('parallel')}`
  } else {
    return ` in ${colo.cyan('sequence')}`
  }
}
