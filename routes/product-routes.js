const express = require('express');
const router = express.Router();
const { getProductsForShop, getProductFromShop, 
        getProductsForManager, getProductForEdit, 
        addProduct, updateProduct, deleteProduct,
        addToBasket, removeProductFromCart, getProductsFromCart, completeOrder } = require('../controllers/product-controller');
const createPath = require('../helpers/create-path');
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadImages')

router.get('/managers-panel/add-product', authMiddleware('Manager'), (req, res) => {
    res.render(createPath('add-product'), { message: '' });
});

router.get('/managers-panel', authMiddleware('Manager'), (req, res) => {
    res.redirect('/managers-panel/add-product');
});

router.get('/cart', authMiddleware('User'), getProductsFromCart)

router.get('/shop', getProductsForShop);

router.get('/shop/:id', getProductFromShop);

router.get('/managers-panel/all-products', authMiddleware('Manager'),  getProductsForManager);

router.get('/managers-panel/edit/:id', authMiddleware('Manager'),  getProductForEdit);

router.post('/managers-panel/add-product', [authMiddleware('User'), upload.single( 'Image' )], addProduct);

router.put('/managers-panel/edit/:id', [authMiddleware('User'), upload.single( 'Image' )], updateProduct);

router.delete('/managers-panel/all-products/:id', authMiddleware('Manager'), deleteProduct);

router.post('/shop/:id', authMiddleware('User'), addToBasket);

router.delete('/cart/:id', authMiddleware('User'), removeProductFromCart);

router.post('/cart/send', completeOrder)
 
module.exports = router;