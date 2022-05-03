// add dependences
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const productRouter = require('./routes/product-routes');
const userRouter = require('./routes/user-routes');
const mainsRouter = require('./routes/main-routes');
const createPath = require('./helpers/create-path');

// create express app
const app = express();

const PORT = 3000;

// set listening port
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

// set view engine
app.set('view engine', 'ejs');

mongoose
    .connect('mongodb://localhost:27017/course', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connect successfull'))
    .catch((error) => console.log(error))

// set static resources
app.use(express.static('css'));
app.use(express.static('icons'));
app.use(express.static('js'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(mainsRouter)
app.use(productRouter); 
app.use(userRouter);

// set error 
app.use((req, res) => {
    res.status(404).render(createPath('error'));
});