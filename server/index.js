const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const middlewares = require("./middlewares");
const reservations = require("./api/reservations");

const app = express();

const port = process.env.PORT || 4000;

console.log(process.env.MESSAGE);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.use("/api/reservations", reservations);

//if page 404
app.use(middlewares.notFound);
//error handling middleware this is the last place where errors go
app.use(middlewares.errorHandler);

app.listen(port, () => console.log(`Listening to port ${port}`));
