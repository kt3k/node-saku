
class Task {
  /**
   * @param {string} name The name
   * @param {string} description The commands
   * @param {string[]} commands The commands
   * @param {Object} options The options
   */
  constructor ({ name, description, commands, options }) {
    this.name = name
    this.description = description
    this.commands = commands
    this.options = options
  }
}

module.exports = Task
