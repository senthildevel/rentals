
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require("mongoose");
const express = require("express");
const category = require("./routes/category")
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
Joi.objectId = require('joi-objectid')(Joi)


const app = express();

app.use(express.json())


mongoose.connect("mongodb://localhost/febbatch-crud")
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log("Something went wrong", err));

app.use("/api/category", category)
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.port || 3000
//const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


