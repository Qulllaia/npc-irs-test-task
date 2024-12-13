CREATE DATABASE book_shop;

CREATE TABLE Authors(
    id BIGINT PRIMARY KEY,
    "name" VARCHAR(255),
    surname VARCHAR(255)
);


CREATE TABLE Book(
    id BIGINT PRIMARY KEY,
    book_name VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    publication DATE NOT NULL,
    pages SMALLINT,
    author_id BIGINT REFERENCES Authors (id)
);


