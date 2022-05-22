const express = require('express');
const router = express.Router();
const { getProductsForShop, getProductFromShop, 
        getProductsForManager, getProductForEdit, 
        addProduct, updateProduct, deleteProduct,
        addToBasket, removeProductFromCart } = require('../controllers/product-controller');

const createPath = require('../helpers/create-path');
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadImages')

router.get('/managers-panel/add-product', (req, res) => {
    res.render(createPath('add-product'), { message: '' });
});

router.get('/managers-panel', (req, res) => {
    res.redirect('/managers-panel/add-product');
});

router.get('/cart', (req, res) => {
    res.render(createPath('cart'));
})

router.get('/shop', getProductsForShop);

router.get('/shop/:id', getProductFromShop);

router.get('/managers-panel/all-products',  getProductsForManager);

router.get('/managers-panel/edit/:id',  getProductForEdit);

router.post('/managers-panel/add-product', upload.single( 'Image' ), addProduct);

router.put('/managers-panel/edit/:id', upload.single( 'Image' ), updateProduct);

router.delete('/managers-panel/all-products/:id', deleteProduct);

router.post('/shop/:id', addToBasket);

router.delete('/cart/:id', removeProductFromCart)
 
module.exports = router;