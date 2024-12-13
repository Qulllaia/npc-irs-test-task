const db = require("../db/database");

class ModelBooks {
  getBooksPagesAndCount = async (limit) => {
    const bookCount = await db.query("SELECT COUNT(id) FROM book");
    return {
      pageCount: Math.ceil(bookCount[0].count / limit),
      booksCount: Number(bookCount[0].count),
    };
  };

  //Ag-grid не поддерживает реализацию IRM с частичной подгрузкой данных
  //Однако в тз было сказано реализовать частичную подгрузку данных
  getBooks = async (page, limit) => {
    return await db.query(
      `SELECT book.id, book.book_name, book.price, book.publication, book.pages, authors.name, authors.surname, book.author_id FROM book INNER JOIN authors ON book.author_id = authors.id ORDER BY book.id LIMIT ${limit} OFFSET ${
        page * limit
      } `
    );
  };

  postBook = async (data) => {
    return await db.query(
      "INSERT INTO Book (book_name, price, publication, pages, author_id) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [data.book_name, data.price, data.publication, data.pages, data.author_id]
    );
  };

  updateBook = async (data) => {
    return await db.query(
      `UPDATE Book SET book_name = $1, price = $2, publication = $3, pages = $4, author_id = $5 WHERE id = $6 RETURNING *`,
      [
        data.book_name,
        data.price,
        data.publication,
        data.pages,
        data.author_id,
        data.id,
      ]
    );
  };

  deleteBooks = async (id) => {
    return await db.query(`DELETE FROM Book WHERE "id" = '${id}' RETURNING *`);
  };
}

module.exports = new ModelBooks();
