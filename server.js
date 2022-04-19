// add dependences
const express = require('express');
const path = require('path'); 
const mongoose = require('mongoose');

// function for create path to files 
const createPath = (page) => path.resolve(__dirname, 'ejs', `${page}.ejs`);

// export shemes
const User = require(__dirname + '/models/User');
const Juice = require(__dirname + '/models/Juice');

// create express app
const app = express();

PORT=3000;

// set listening port
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

// set view engine
app.set('view engine', 'ejs');

DB='mongodb://localhost:27017/course'

mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connect successfull'))
    .catch((error) => console.log(error))

// set static resources
app.use(express.static('css'));
app.use(express.static('icons'));
app.use(express.urlencoded({ extended: false }));

// create routing
app.get('/', (req, res) => { 
    res.render(createPath('index'));
});

app.get('/home', (req, res) => {
    res.redirect('/');
});

app.get('/account', (req, res) => {
    res.render(createPath('account'));
});

app.get('/add-product', (req, res) => {
    res.render(createPath('add-product'));
});

app.get('/auth', (req, res) => {
    res.render(createPath('auth'));
});

app.get('/shop', (req, res) => {
    Juice
    .find()
    .then((juice) =>{
        res.render(createPath('shop'), {juice});
    })
    .catch((error) => console.log(error));
});

app.get('/shop/:id', (req, res) => {
    Juice
    .findById(req.params.id)
    .then((juice) =>{
        res.render(createPath('product'), {juice});
    })
    .catch((error) => console.log(error));
});

app.get('/all-products', (req, res) => {
    Juice
    .find()
    .then((juice) =>{
        res.render(createPath('all-products'), {juice});
    })
    .catch((error) => console.log(error));
});

// create 'post' query
app.post('/add-product', (req, res) => {
    const {Name, Description, Price} = req.body;

    const product = new Juice ({Name, Description, Price});
    product
        .save()
        .then((result) => res.redirect('/shop'))
        .catch((error) => console.log(error));
});

app.post('/auth', (req, res) => {
    const {Name, Password, Role} = req.body;

    const user = new User ({Name, Password, Role});
    user
        .save()
        .then((result) => res.redirect('/account'))
        .catch((error) => console.log(error));
});

app.delete('/all-products/:id', (req, res) => {
    Juice
    .findByIdAndDelete(req.params.id)
    .then((result) =>{
        res.sendStatus(200);
    })
    .catch((error) => console.log(error));
});

// set error 
app.use((req, res) => {
    res.status(404).render(createPath('error'));
});