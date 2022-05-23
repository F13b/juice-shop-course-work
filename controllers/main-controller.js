const createPath = require('../helpers/create-path');
const hasToken = require('../helpers/hasToken');

const GetMainPage = (req, res) => {
    res.render(createPath('index'), {hasToken: hasToken(req)});
}

const GetErrorPage = (req, res) => {
    res.render(createPath('error'));
}

module.exports = {
    GetMainPage,
    GetErrorPage
}