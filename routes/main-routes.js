const express = require('express');
const router = express.Router();
const {GetMainPage} = require('../controllers/main-controller')

router.get('/main', GetMainPage);

router.get('/home', (req, res) => {
    res.redirect('/main');
});

router.get('/', (req, res) => {
    res.redirect('/main');
});

module.exports = router;