
/**
 * Prepends the emoji to the given msg.
 */
exports.prependEmoji = (emoji, msg) => {
  if (process.stdout.isTTY) {
    return `${emoji}  ${msg}`
  }

  return msg
}

exports.appendEmoji = (emoji, msg) => {
  if (process.stdout.isTTY) {
    return `${msg}${emoji}  `
  }

  return msg
}
