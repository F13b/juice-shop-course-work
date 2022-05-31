const createPath = require('../helpers/create-path');
const hasToken = require('../helpers/hasToken');
const Juice = require('../models/Juice');

const GetMainPage = (req, res) => {

    Juice
    .find()
    .then((juice) => {
        res.render(createPath('index'), {hasToken: hasToken(req), juice});
    })
    .catch((error) => {
        consol.log(error);
        res.redirect('/error');
    })
}

const GetErrorPage = (req, res) => {
    res.render(createPath('error'));
}

module.exports = {
    GetMainPage,
    GetErrorPage
}