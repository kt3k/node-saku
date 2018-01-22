const { Task } = require('./domain')

/**
 * @param {string} text The markdown text
 * @return {Task[]}
 */
module.exports = text => {
  return new Task.Factory().createFromMarkdown(text)
}
