const express = require('express');
const router = express.Router();
const { getProductsForShop, getProductFromShop, 
        getProductsForManager, getProductForEdit, 
        addProduct, updateProduct, deleteProduct } = require('../controllers/product-controller');

const createPath = require('../helpers/create-path');
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadImages')

router.get('/add-product', (req, res) => {
    res.render(createPath('add-product'));
});

router.get('/shop', getProductsForShop);

router.get('/shop/:id', getProductFromShop);

router.get('/all-products',  getProductsForManager);

router.get('/edit/:id',  getProductForEdit);

router.post('/add-product', upload.single( 'Image' ), addProduct);

router.put('/edit/:id', updateProduct);

router.delete('/all-products/:id', deleteProduct);
 
module.exports = router;