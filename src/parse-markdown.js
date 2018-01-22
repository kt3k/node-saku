const { Task } = require('./domain')

/**
 * @param {string} text The markdown text
 * @return {Task[]}
 */
const parseMarkdown = text => {
  return new Task.Factory().createFromMarkdown(text)
}
