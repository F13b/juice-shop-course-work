const express = require('express');
const router = express.Router();
const { Registrate, Authorize } = require('../controllers/user-controller')
const createPath = require('../helpers/create-path');

router.get('/account', (req, res) => {
    res.render(createPath('account'));
});

router.get('/registration', (req, res) => {
    res.render(createPath('reg'));
});

router.get('/reg', (req, res) => {
    res.redirect('/registration');
});

router.post('/registration', Registrate);

router.get('/authorization', (req, res) => {
    res.render(createPath('auth'))
});

// router.get('/authorize/auth', Authorize);

module.exports = router;