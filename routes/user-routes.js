const express = require('express');
const router = express.Router();
const { Registrate, Authorize } = require('../controllers/user-controller')
const createPath = require('../helpers/create-path');

router.get('/account', (req, res) => {
    res.render(createPath('account'), { message: '' });
});

router.get('/signup', (req, res) => {
    res.render(createPath('reg'), { message: '' });
});

router.get('/reg', (req, res) => {
    res.redirect('/signup');
});

router.post('/signup', Registrate);

router.get('/signin', (req, res) => {
    res.render(createPath('auth'), { message: '' });
});

router.get('/auth', (req, res) => {
    res.redirect('/signin');
});

router.get('/authorization', (req, res) => {
    res.redirect('/signin');
});

router.post('/signin', Authorize);

module.exports = router;