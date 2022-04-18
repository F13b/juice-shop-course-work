// add dependences
const express = require('express');
const path = require('path'); 
// const mongoose = require('mongoose');

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const firebase = require("firebase");

// function for create path to files 
const createPath = (page) => path.resolve(__dirname, 'ejs', `${page}.ejs`);

// export shemes
const User = require('/Users/pakon/Documents/course-work/models/User');

const firebaseConfig = {
    apiKey: "AIzaSyBihLfJPWerV8qWMWKehb3MzFM0INjeonA",
    authDomain: "course-e1b45.firebaseapp.com",  
    projectId: "course-e1b45",  
    storageBucket: "course-e1b45.appspot.com",  
    messagingSenderId: "252872003139",  
    appId: "1:252872003139:web:3aabe8c55b25e038dc0ef6",  
    measurementId: "G-SE8WDMSZG1"  
};

const fireApp = initializeApp(firebaseConfig);
const db = fireApp.firestore();

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection("users").doc().set(data);
        res.send('seccess');
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// create express app
const app = express();

// set port
const PORT = 3000;

// set listening port
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

// set view engine
app.set('view engine', 'ejs');

// set static resources
app.use(express.static('css'));
app.use(express.static('icons'));
app.use(express.urlencoded({ extended: false }));

// create routing
app.get('/', (req, res) => { 
    const querySnapshot = getDocs(collection(fireDB, "test"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
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

// create 'post' query
app.post('/add-product', (req, res) => {
    // const {Name, Description, Price, Picture} = req.body;

    // const card = new Card ({Name, Description, Price, Picture});
    // card
    //     .save()
    //     .then((result) => res.redirect('/account'))
    //     .catch((error) => console.log(error));
});

app.post('/auth', addUser);

app.get('/shop', (req, res) => {
    // Card
    // .find()
    // .then((cards) =>{
    //     res.render(createPath('shop'), {cards});
    // })
    // .catch((error) => console.log(error));
});

app.get('/shop/:id', (req, res) => {
    // Card
    // .findById(req.params.id)
    // .then((card) =>{
    //     res.render(createPath('product'), {card});
    // })
    // .catch((error) => console.log(error));
});

// set error 
app.use((req, res) => {
    res.status(404).render(createPath('error'));
});