const model = require("../models/books.model");
const vallidators = require("./validators");

const NECESSARY_DATA = [
  "book_name",
  "price",
  "publication",
  "pages",
  "author_id",
];

class BooksController {
  async getBooksPagesAndCount(req, res) {
    try {
      const limit = req.params.limit;
      const bookPages = await model.getBooksPagesAndCount(limit);
      res.status(200).send(bookPages);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  async getBooks(req, res) {
    try {
      const page = req.params.page;
      const limit = req.params.limit;
      const books = await model.getBooks(page, limit);
      res.status(200).send(books);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  async postBooks(req, res) {
    try {
      const data = req.body;
      const chechResult = vallidators.dataCheck(data, NECESSARY_DATA);

      if (chechResult) {
        res.status(400).send({ message: chechResult });
        return;
      }

      if (!vallidators.validateNumberType(data.price)) {
        res.status(400).send({
          message: "Параметр цены книги содержит неверный тип данных",
        });
        return;
      }
      if (!vallidators.validateNumberType(data.pages)) {
        res.status(400).send({
          message: "Параметр страниц книги содержит неверный тип данных",
        });
        return;
      }
      if (data.price < 1 || data.pages < 1) {
        res.status(400).send({
          message: "Числовые данные не могут быть меньше единицы",
        });
        return;
      }

      const book = await model.postBook(data);
      res.status(200).send(book);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  async updateBooks(req, res) {
    try {
      const data = {
        id: req.params.id,
        ...req.body,
      };

      const chechResult = vallidators.dataCheck(data, NECESSARY_DATA);

      if (chechResult) {
        res.status(400).send({ message: chechResult });
        return;
      }

      if (!vallidators.validateNumberType(data.price)) {
        res.status(400).send({
          message: "Параметр цены книги содержит неверный тип данных",
        });
        return;
      }
      if (!vallidators.validateNumberType(data.pages)) {
        res.status(400).send({
          message: "Параметр страниц книги содержит неверный тип данных",
        });
        return;
      }

      const book = await model.updateBook(data);
      res.status(200).send(book);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  async deleteBooks(req, res) {
    try {
      const deletedVal = await model.deleteBooks(req.params.id);
      res.status(200).send(deletedVal);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
}

module.exports = new BooksController();
