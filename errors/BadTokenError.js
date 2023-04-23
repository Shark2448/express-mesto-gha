class BadTokenError extends Error {
  constructor(message) {
    super(message);
    this.StatusCode = 401;
  }
}

module.exports = BadTokenError;
