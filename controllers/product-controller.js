const Juice = require('../models/Juice');
const Order = require('../models/Order');
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

const addToBasket = async (req, res) => {
    const {user_id, product_id, count} = req.body;

    let order = await Order.findOne({User: '62851d9faaeb35d8de8d0662'});

    if (!order) {
        order = {
            User: '62851d9faaeb35d8de8d0662',
            Purchases: [
                {
                    Product: product_id,
                    Count: count
                }
            ]
        }

        try {
            await new Order(order).save().then((result) => res.redirect('/shop')).catch((error) => {console.log(error); res.status(400).redirect('/error')})
        } catch (error) {
            console.log(error); 
            res.redirect('/shop');
        }        
    } else {
        const order_id = order.id;

        order.Purchases.forEach(item => {
            if (item.Product == product_id) {
                item.Count += parseInt(count);
                
                try {
                    Order.findByIdAndUpdate(order_id, order).then((result) => res.redirect('/shop')).catch((error) => {console.log(error); res.redirect('/error')})
                } catch (error) {
                    console.log(error); 
                    res.redirect('/error');
                } 
            }
        });

        order.Purchases.push({Product: product_id, Count: count}); 

        try {
            Order.findByIdAndUpdate(order_id, order).then((result) => res.redirect('/shop')).catch((error) => {console.log(error); res.redirect('/error')})
        } catch (error) {
            console.log(error); 
            res.redirect('/error');
        } 
    }
    
}

const removeProductFromCart = async (req, res) => {
    const {user_id, product_id} = req.body;

    let user_order = await Order.findOne({User: '62851d9faaeb35d8de8d0662'});

    if (user_order) {
        let order_id = user_order.id;
        try {
            user_order.Purchases.forEach(item => {
                if (item.product == product_id) {
                    let i = indexOf(item);

                    user_order.Purchases.splice(i);

                    try {
                        Order.findByIdAndUpdate(order_id, user_order).then((result) => res.redirect('/shop')).catch((error) => {console.log(error); res.redirect('/error')})
                    } catch (error) {
                        console.log(error); 
                        res.redirect('/error');
                    }
                }
            })
        } catch (error) {
            console.log(error); 
            res.redirect('/error');
        }
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
    removeProductFromCart
}