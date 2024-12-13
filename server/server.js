const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRouter = require("./routes/books.route");
const authorsRouter = require("./routes/authors.route");

const app = express();
const port = 8080;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(bodyParser.json());
app.use("/api", bookRouter);
app.use("/api", authorsRouter);

app.use(express.json());

app.listen(port, () => console.log(`Server started on port ${port}`));
