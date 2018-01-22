const spawn = require('@expo/spawn-async')

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

  /**
   * Runs all the commands sequentially.
   */
  async run ({ cwd }) {
    return this.commands
      .reduce((p, command) => p.then(() => this.runSingle(command, { cwd })), Promise.resolve())
  }

  /**
   * @param {string} command The command
   * @param {string} cwd The working dir
   */
  async runSingle (command, { cwd }) {
    const args = command.split(/\s+/)
    const cmd = args.shift()

    await spawn(cmd, args, { cwd, stdio: 'inherit' })
  }
}

module.exports = Task
