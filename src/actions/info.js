const colo = require('colo')
const { INDENT_2, INDENT_4 } = require('../util/format')

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
    console.log(colo.cyan(`${INDENT_2}[${task.name}]`))
    if (task.description) {
      console.log(`${INDENT_4}${task.description.replace('\n', `\n${INDENT_4}`)}`)
    } else {
      console.log(colo.italic('    No description'))
    }
  })
}
