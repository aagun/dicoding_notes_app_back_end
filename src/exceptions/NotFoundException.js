const ClientException = require("./ClientException");

class NotFoundException extends ClientException {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundException;
