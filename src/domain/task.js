
class Task {
  /**
   * @param {string} name The name
   * @param {Object} options The options
   * @param {string[]} commands The commands
   */
  constructor (name, options, commands) {
    this.name = name
    this.options = options
    this.commands = commands
  }
}

module.exports = Task
