const Juice = require('../models/Juice');
const createPath = require('../helpers/create-path');

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
        res.render(createPath('edit-product'), {juice});
    })
    .catch((error) => console.log(error));
}

const addProduct = (req, res) => {
    const {Name, Description, Price, Count} = req.body;

    const product = new Juice ({Name, Description, Price, Count});
    product
        .save()
        .then((result) => res.redirect('/shop'))
        .catch((error) => console.log(error));
}

const updateProduct = (req, res) => {
    const {Name, Description, Price, Count} = req.body;
    const { id } = req.params;
    Juice
    .findByIdAndUpdate(id, {Name, Description, Price, Count})
    .then((result) =>{
        res.redirect('/all-products');
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