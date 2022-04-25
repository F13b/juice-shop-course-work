// add dependences
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const productRouter = require('./routes/product-routes')
const userRouter = require('./routes/user-routes')
const createPath = require('./helpers/create-path');

// create express app
const app = express();

// set listening port
app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
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
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); 
app.use(productRouter); 
app.use(userRouter); 

// create routing
app.get('/main', (req, res) => { 
    res.render(createPath('index'));
});

app.get('/home', (req, res) => {
    res.redirect('/main');
});

app.get('/', (req, res) => {
    res.redirect('/main');
});

// set error 
app.use((req, res) => {
    res.status(404).render(createPath('error'));
});