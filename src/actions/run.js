const colo = require('colo')
const logger = require('../logger')
const { prependEmoji } = require('../util/emoji')

module.exports = async (argv, allTasks, { cwd }) => {
  const { parallel: isParallel, quiet, race: isRace, sequential: isSequential, _: taskNames } = argv

  if (quiet) {
    logger.quiet()
  }

  taskNames.forEach(name => {
    if (!allTasks.isValidTaskName(name)) {
      console.log(`${colo.red('Error')}: Invalid task name: "${name}"`)
      console.log(`Valid task names: ${colo.cyan(allTasks.taskNames.join(' '))}`)
      process.exit(1)
    }
  })

  const tasks = allTasks.filterByNames(taskNames)
  const names = tasks.taskNames.join(', ')

  tasks.on('task', ({ task: { name }, command }) => {
    logger.logPlus(command)
  })

  if (isParallel && isSequential) {
    console.log(
      `${colo.red('Error')}: both --parallel and --sequential are set`
    )

    process.exit(1)
  }

  logStart(names, tasks.length, isParallel, isRace)

  try {
    await tasks.run({ cwd, isParallel, isRace })

    logFinish(names, tasks.length, isParallel, isRace)
  } catch (e) {
    if (e.task) {
      console.log(`${colo.red('Error')}: task ${colo.magenta(e.task.name)} failed`)

      process.exit(1)
    }

    throw e
  }
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
  } else if (!isParallel) {
    return ` in ${colo.cyan('sequence')}`
  } else if (isRace) {
    return ` in ${colo.cyan('parallel-race')}`
  } else {
    return ` in ${colo.cyan('parallel')}`
  }
}
