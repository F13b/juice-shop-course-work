const express = require('express');
const router = express.Router();
const User = require('../models/User');
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

router.post('/registration', (req, res) => {
    const {Name, Password, Role} = req.body;

    const user = new User ({Name, Password, Role});
    user
        .save()
        .then((result) => res.redirect('/account'))
        .catch((error) => console.log(error));
});

module.exports = router;