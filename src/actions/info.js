const colo = require('colo')

/**
 * Shows the information of tasks
 */
module.exports = tasks => {
  if (tasks.length === 0) {
    console.log(`${colo.italic('No tasks')}, check ${colo.cyan('saku.md')}`)
  } else if (tasks.length === 1) {
    console.log(`There is ${colo.magenta(tasks.length)} task`)
  } else {
    console.log(`There are ${colo.magenta(tasks.length)} tasks`)
  }

  tasks.forEach(task => {
    console.log(colo.cyan(`  [${task.name}]`))
    if (task.description) {
      console.log(`    ${task.description.replace('\n', '\n  ')}`)
    } else {
      console.log(colo.italic('    No description'))
    }
  })
}
