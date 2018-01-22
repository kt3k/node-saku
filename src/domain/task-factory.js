const remark = require('remark')
const TaskCollection = require('./task-collection')
const Task = require('./task')
const {
  getStringValue,
  getMultilineValue
} = require('../util/ast')

const HEADING = 'heading'
const PARAGRAPH = 'paragraph'
const BLOCKQUOTE = 'blockquote'

class TaskFactory {
  /**
   * @param {string} text The input markdown
   * @return {TaskCollection}
   */
  createFromMarkdown (text) {
    const ast = remark.parse(text)
    const tasks = []

    ast.children.forEach(node => {
      if (node.type === HEADING) {
        tasks.unshift([node])
      } else if (tasks.length > 0) {
        tasks[0].push(node)
      }
    })

    return new TaskCollection(tasks.reverse().map(obj => this.createOneFromNodes(obj)))
  }

  /**
   * @param {Node[]} nodes
   * @return {Task}
   */
  createOneFromNodes (nodes) {
    const name = getStringValue(nodes.shift())
    const descriptions = []
    const commands = []
    const options = {}

    nodes.forEach(node => {
      if (node.type === BLOCKQUOTE) {
        descriptions.push(...getMultilineValue(node.children[0]))
      } else if (node.type === PARAGRAPH) {
        commands.push(...getMultilineValue(node))
      }
    })

    return new Task({
      name,
      description: descriptions.join('\n'),
      commands,
      options
    })
  }
}

module.exports = TaskFactory
