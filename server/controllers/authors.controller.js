const model = require("../models/authors.model");

class AuthorsController {
  async getAuthors(req, res) {
    try {
      const authorsCount = await model.getAuthors();
      res.status(200).send(authorsCount);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
}

module.exports = new AuthorsController();
