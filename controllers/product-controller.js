const Juice = require('../models/Juice');
const createPath = require('../helpers/create-path');
var fs = require( 'fs' );
const path = require('path'); 

const getProductsForShop = (req, res) => {
    Juice
    .find()
    .then((juice) =>{
        res.render(createPath('shop'), {juice});
    })
    .catch((error) => console.log(error));
}

const getProductFromShop = (req, res) => {
    Juice
    .findById(req.params.id) 
    .then((juice) =>{
        res.render(createPath('product'), {juice});
    })
    .catch((error) => console.log(error));
}

const getProductsForManager = (req, res) => {
    Juice
    .find()
    .then((juice) =>{
        res.render(createPath('all-products'), {juice});
    })
    .catch((error) => console.log(error));
}

const getProductForEdit = (req, res) => {
    Juice
    .findById(req.params.id)
    .then((juice) =>{
        res.render(createPath('edit-product'), {juice, message: ''});
    })
    .catch((error) => console.log(error));
}

const addProduct = async (req, res) => {
    let candidate = await Juice.findOne({Name: req.body.Name});

    if (candidate) {
        res.render(createPath('add-product'), { message: 'The product with this name is already in stock!' });
    } else {
        let productCandidate = {
            Name: req.body.Name,
            Description: req.body.Description, 
            Price: req.body.Price, 
            Count: req.body.Count, 
            Images: {
                data: fs.readFileSync(path.join('C:/Users/pakon/Documents/juice-shop-course-work/uploads/' + req.file.filename)),
                contentType: 'image/jpg'
            }
        }

        const product = new Juice (productCandidate);
        product
            .save()
            .then((result) => res.redirect('/shop'))
            .catch((error) => console.log(error));
    }
}

const updateProduct = (req, res) => {
    const { id } = req.params;

    let productCandidate = {
        Name: req.body.Name,
        Description: req.body.Description, 
        Price: req.body.Price, 
        Count: req.body.Count, 
        Images: {
            data: fs.readFileSync(path.join('C:/Users/pakon/Documents/juice-shop-course-work/uploads/' + req.file.filename)),
            contentType: 'image/jpg' 
        }
    }

    Juice
    .findByIdAndUpdate(id, productCandidate)
    .then((result) =>{
        res.redirect('/managers-panel/all-products');
    })
    .catch((error) => console.log(error)); 
} 

const deleteProduct = (req, res) => {
    Juice
    .findByIdAndDelete(req.params.id)
    .then((result) =>{
        res.sendStatus(200).redirect('/shop');
    })
    .catch((error) => console.log(error));
}

module.exports = {
    getProductsForShop,
    getProductFromShop,
    getProductsForManager,
    getProductForEdit,
    addProduct,
    updateProduct,
    deleteProduct
}