const EventEmitter = require('events')
const spawn = require('@expo/spawn-async')

class Task extends EventEmitter {
  /**
   * @param {string} name The name
   * @param {string} description The commands
   * @param {string[]} commands The commands
   * @param {Object} options The options
   */
  constructor ({ name, description, commands, options }) {
    super()

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
    this.emit('task', { task: this, command })

    const args = command.split(/\s+/)
    const cmd = args.shift()

    const promise = spawn(cmd, args, { cwd, stdio: 'inherit' })

    this.child = promise.child

    await promise
  }

  /**
   * Aborts the task.
   * TODO: kill child process as well
   * TODO: windows support
   */
  abort () {
    if (!this.child.killed) {
      this.child.kill()
    }
  }
}

module.exports = Task
