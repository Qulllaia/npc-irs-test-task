const Router = require("express");
const route = new Router();
const authorsController = require("../controllers/authors.controller");

route.get("/authors", authorsController.getAuthors);

module.exports = route;
