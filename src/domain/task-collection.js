/**
 * The collection model of Tasks.
 */
class TaskCollection {
  /**
   * @param {Task[]} tasks The tasks
   */
  constructor (tasks) {
    this.tasks = tasks || []
  }

  get length () {
    return this.tasks.length
  }
}

module.exports = TaskCollection
