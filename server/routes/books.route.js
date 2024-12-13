const Router = require("express");
const route = new Router();
const bookController = require("../controllers/books.controller");

route.get("/books/:page&:limit", bookController.getBooks);
route.get("/books/:limit", bookController.getBooksPagesAndCount);
route.post("/books", bookController.postBooks);
route.put("/books/:id", bookController.updateBooks);
route.delete("/books/:id", bookController.deleteBooks);

module.exports = route;
