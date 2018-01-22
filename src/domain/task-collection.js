/**
 * The collection model of Tasks.
 */
class TaskCollection {
  /**
   * @param {Task[]} tasks The tasks
   */
  constructor (tasks) {
    this.tasks = tasks || []
    this.taskNames = tasks.map(task => task.name)
  }

  get length () {
    return this.tasks.length
  }

  /**
   * @param {string} name The task name
   * @return {boolean}
   */
  isValidTaskName (name) {
    return this.taskNames.includes(name)
  }

  /**
   * @param {string} name The name of the task
   */
  getByName (name) {
    return this.tasks.find(task => task.name === name)
  }

  filterByNames (names) {
    return new TaskCollection(names.map(name => this.getByName(name)))
  }

  /**
   * Runs the tasks in parallel.
   */
  async runParallel ({ cwd }) {
    return Promise.all(this.tasks.map(task => task.run({ cwd })))
  }

  /**
   * Runs the tasks sequentially.
   */
  async runSequential ({ cwd }) {
    return this.tasks.reduce((p, task) => p.then(() => task.run({ cwd })), Promise.resolve())
  }
}

module.exports = TaskCollection
