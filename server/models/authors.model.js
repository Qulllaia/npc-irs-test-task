const db = require("../db/database");

class ModelAuthors {
  getAuthors = async () => {
    return await db.query("SELECT id, name, surname FROM authors");
  };
}

module.exports = new ModelAuthors();
