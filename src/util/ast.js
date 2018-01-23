/**
 * utility about ast
 */

exports.PARAGRAPH = 'paragraph'
exports.BLOCKQUOTE = 'blockquote'
exports.CODE = 'code'
exports.HEADING = 'heading'

/**
 * @param {Node} node
 * @return {string}
 */
exports.getStringValue = node => {
  const firstChild = node.children[0]

  if (firstChild) {
    return firstChild.value
  }

  return ''
}

/**
 * @param {Node} node
 * @return {string[]}
 */
exports.getMultilineValue = node => {
  const firstChild = node.children[0]

  if (firstChild && typeof firstChild.value === 'string') {
    return firstChild.value.split('\n')
  }

  return []
}
