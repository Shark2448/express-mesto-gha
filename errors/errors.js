class notFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class badRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class serverError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  notFoundError,
  badRequestError,
  serverError
}