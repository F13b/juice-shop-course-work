// add dependences
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const productRouter = require('./routes/product-routes');
const userRouter = require('./routes/user-routes');
const mainsRouter = require('./routes/main-routes');
const adminRouter = require('./routes/admin-routes');
const createPath = require('./helpers/create-path');
var bodyParser = require( 'body-parser' );
const cookieParser = require('cookie-parser');

// create express app
const app = express();

const PORT = process.env.PORT || 3000;

// set listening port
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

// set view engine
app.set('view engine', 'ejs');

mongoose
    .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connect successfull'))
    .catch((error) => console.log(error))

// set static resources
app.use(express.static('css'));
app.use(express.static('icons'));
app.use(express.static('js'));
app.use(express.static('rive'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(mainsRouter)
app.use(productRouter); 
app.use(userRouter);
app.use(adminRouter);

// set error 
app.use((req, res) => {
    res.status(404).render(createPath('error'));
});