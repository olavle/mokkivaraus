const { json } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get("/", (req, res) => {
  res.json({
    message: 'Hello world'
  });
});

app.use((req, res, next) => {
    const error = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(error);
});

//error handling middleware
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? "There is an error" : error.stack
    })
})

app.listen(port, () => console.log(`Listening to port ${port}`));
