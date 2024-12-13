CREATE DATABASE book_shop;

CREATE TABLE Authors(
    id BIGINT PRIMARY KEY,
    "name" VARCHAR(255),
    surname VARCHAR(255)
);
INSERT INTO public.authors(
	id, name, surname)
	VALUES (1, 'Лев', 'Толстой');
INSERT INTO public.authors(
	id, name, surname)
	VALUES (2, 'Александр', 'Пушкин');
INSERT INTO public.authors(
	id, name, surname)
	VALUES (3, 'Николай', 'Гоголь');
INSERT INTO public.authors(
	id, name, surname)
	VALUES (4, 'Джордж', 'Оруэлл');

CREATE TABLE Book(
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    book_name VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    publication DATE NOT NULL,
    pages SMALLINT,
    author_id BIGINT REFERENCES Authors (id)
);

INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Детство', 12, '12.12.1212', 312, 1);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Молодость', 15, '12.12.3212', 200, 1);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Юность', 13, '12.12.1212', 125, 1);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Война и мир', 13, '12.12.1712', 125, 1);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Сказка о рыбаке и рыбке', 13, '13.12.1212', 125, 2);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Сказка о мёртвой царевне и о семи богатырях', 13, '12.12.1252', 125, 2);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Сказка о рыбаке и рыбке', 13, '12.12.1212', 125, 2);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Мёртвые души', 10, '12.12.1212', 300, 3);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Вий', 9, '13.12.1812', 400, 3);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Тарас Бульба', 19, '13.12.1815', 500, 3);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('1984', 19, '13.12.1917', 500, 4);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Скотный двор', 15, '13.12.1915', 200, 4);
INSERT INTO public.book(
	book_name, price, publication, pages, author_id)
	VALUES ('Дочь священника', 17, '13.12.1927', 100, 4);

