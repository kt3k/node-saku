const EventEmitter = require('events')

/**
 * The collection model of Tasks.
 */
class TaskCollection extends EventEmitter {
  /**
   * @param {Task[]} tasks The tasks
   */
  constructor (tasks) {
    super()

    this.tasks = tasks || []
    this.taskNames = tasks.map(task => task.name)
    this.bindEvents()
  }

  bindEvents () {
    new Set(this.tasks).forEach(task => {
      task.on('task', e => this.emit('task', e))
    })
  }

  get length () {
    return this.tasks.length
  }

  /**
   * Runs f for each task.
   * @param {Function} f The function
   */
  forEach (f) {
    this.tasks.forEach(f)
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
   * Runs the task in parallel and abort them when the first one finished.
   */
  async runInRace({ cwd }) {
    await Promise.race(this.tasks.map(task => task.run({ cwd })))

    this.tasks.forEach(task => task.abort())
  }

  /**
   * Runs the tasks sequentially.
   */
  async runSequential ({ cwd }) {
    return this.tasks.reduce((p, task) => p.then(() => task.run({ cwd })), Promise.resolve())
  }
}

module.exports = TaskCollection
