const EventEmitter = require('events')
const spawn = require('@expo/spawn-async')
const getDescendentProcessInfo = require('ps-tree')

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
    this.aborted = false
  }

  /**
   * Runs all the commands sequentially.
   */
  async run ({ cwd }) {
    return this.commands.reduce(
      (p, command) => p.then(() => this.runSingle(command, { cwd })),
      Promise.resolve()
    )
  }

  /**
   * @param {string} command The command
   * @param {string} cwd The working dir
   */
  async runSingle (command, { cwd }) {
    if (this.aborted) {
      // does nothing, stop immediately if the task is aborted
      return
    }

    this.emit('task', { task: this, command })

    const { file, args, opts } = this.createSpawnParams(command)

    const promise = spawn(file, args, Object.assign({}, opts, { cwd, stdio: 'inherit' }))

    this.child = promise.child

    await promise
  }

  /**
   * @param {string} command
   */
  createSpawnParams (command) {
    const opts = { opts: {} }

    if (process.platform === 'win32') {
      opts.file = 'cmd.exe';
      opts.args = ['/s', '/c', '"' + command + '"'];
      opts.opts.windowsVerbatimArguments = true;
    } else {
      opts.file = '/bin/sh';
      opts.args = ['-c', command];
    }

    return opts
  }

  /**
   * Aborts the task.
   * TODO: windows support
   */
  abort () {
    this.aborted = true

    getDescendentProcessInfo(this.child.pid, (err, descendent) => {
      if (err) {
        return
      }

      for (const child of descendent) {
        try {
          process.kill(child.pid)
        } catch (e) {
          // ignore.
        }
      }
    })

    this.child.kill()
  }
}

module.exports = Task
