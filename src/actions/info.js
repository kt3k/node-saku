const colo = require('colo')

/**
 * Shows the information of tasks
 */
module.exports = tasks => {
  tasks.forEach(task => {
    console.log(colo.cyan(`task [${task.name}]`))
    if (task.description) {
      console.log(`  ${task.description.replace('\n', '\n  ')}`)
    } else {
      console.log(colo.italic('  No description'))
    }
  })
}
