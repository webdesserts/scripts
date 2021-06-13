const { EOL } = require("os")

class AppError extends Error {
  /**
   * @param {string} message
   * @param {string[] | string | null} details
   */
  constructor(message, details = null) {
    super(message)
    this.details = Array.isArray(details) ? details.join(EOL) :details
  }
}

module.exports = { AppError }