const express = require('express');
const router = express.Router();
const {GetMainPage, GetErrorPage} = require('../controllers/main-controller')

router.get('/main', GetMainPage);

router.get('/error', GetErrorPage)

router.get('/home', (req, res) => {
    res.redirect('/main');
});

router.get('/', (req, res) => {
    res.redirect('/main');
});

module.exports = router;