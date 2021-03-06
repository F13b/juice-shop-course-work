const Juice = require('../models/Juice');
const Order = require('../models/Order');
const User = require('../models/User');
const path = require('path');
const createPath = require('../helpers/create-path');
const hasToken = require('../helpers/hasToken');
const getData = require('../helpers/getDataFromToken');
const nodemailer = require('nodemailer');
var fs = require( 'fs' );

const getProductsForShop = (req, res) => {
    Juice
    .find()
    .then((juice) =>{
        
        res.render(createPath('shop'), {juice, hasToken: hasToken(req)});
    })
    .catch((error) => console.log(error));
}

const getProductFromShop = (req, res) => {
    Juice
    .findById(req.params.id) 
    .then((juice) =>{
        res.render(createPath('product'), {juice, hasToken: hasToken(req)});
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
            .then((result) => res.redirect('/managers-panel/all-products'))
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
        res.redirect('/shop');
    })
    .catch((error) => console.log(error));
}

const getProductsFromCart = async (req, res) => {

    const user = getData(req);

    Order
    .findOne({User: user.id})
    .then((order) => {
        res.render(createPath('cart'), {order, hasToken: hasToken(req)});
    })
    .catch((error) => console.log(error));
}

const addToBasket = async (req, res) => {

    const {product_id, count} = req.body;

    let user = getData(req);

    const user_id = user.id;

    let order = await Order.findOne({User: user_id});

    if (!order) {
        let product = await Juice.findById(product_id);
        
        order = {
            User: user_id,
            Purchases: [
                {
                    productID: product_id,
                    productName: product.Name,
                    productPrice: product.Price * parseInt(count),
                    productCount: parseInt(count),
                    productImages: {
                        data: product.Images.data,
                        contentType: product.Images.contentType 
                    }
                }
            ]
        };

        await new Order(order)
        .save()
        .then((result) => res.redirect('/shop'))
        .catch((error) => {
            console.log(error);
            res.redirect('/error');
        })
    } else {
        const order_id = order.id;

        let hasProduct = [];

        hasProduct = order.Purchases.filter(prod => prod.productID == product_id);

        if (hasProduct.length) {
            let product = await Juice.findById(product_id);

            if (product) {
                hasProduct[0].productCount += parseInt(count);
                hasProduct[0].productPrice = hasProduct[0].productCount * product.Price;

                await Order
                .findByIdAndUpdate(order_id, order)
                .then((result) => res.redirect('/shop'))
                .catch((error) => {
                    console.log(error);
                    res.redirect('/error');
                })
            }
        } else {
            let product = await Juice.findById(product_id);

            if (product) {
                
                order.Purchases.push({
                    productID: product_id,
                    productName: product.Name,
                    productPrice: product.Price * parseInt(count),
                    productCount: parseInt(count),
                    productImages: {
                        data: product.Images.data,
                        contentType: product.Images.contentType 
                    }
                });

                await Order
                .findByIdAndUpdate(order_id, order)
                .then((result) => res.redirect('/shop'))
                .catch((error) => {
                    console.log(error);
                    res.redirect('/error');
                })
            }
        }
    }    
}

const removeProductFromCart = async (req, res) => {
    const {product_id} = req.body;

    let user = getData(req);

    const user_id = user.id;

    let user_order = await Order.findOne({User: user_id});

    if (user_order) {
        let order_id = user_order.id;
        try {
            user_order.Purchases.forEach(item => {
                if (item.product == product_id) {
                    let i = user_order.Purchases.indexOf(item);

                    user_order.Purchases.splice(i);

                    Order.findByIdAndUpdate(order_id, user_order)
                    .then((result) => res.redirect('/shop'))
                    .catch((error) => {
                        console.log(error);
                         res.redirect('/error')
                    })
                }
            })
        } catch (error) {
            console.log(error); 
            res.redirect('/error');
        }
    }
}

const confirmOrder = async (req, res) => {
    let user = getData(req);

    const user_id = user.id;

    let user_order = await Order.findOne({User: user_id});

    if (user_order) {
        Order.findByIdAndDelete(user_order.id)
        .then((result) => res.redirect('/main'))
        .catch((error) => {
        console.log(error);
            res.redirect('/error')
        })
    }
}

module.exports = {
    getProductsForShop,
    getProductFromShop,
    getProductsForManager,
    getProductForEdit,
    addProduct,
    updateProduct,
    deleteProduct,
    addToBasket,
    removeProductFromCart,
    getProductsFromCart,
    confirmOrder
}