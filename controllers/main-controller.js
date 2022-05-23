const createPath = require('../helpers/create-path');

const GetMainPage = (req, res) => {
    res.render(createPath('index'));
}

const GetErrorPage = (req, res) => {
    res.render(createPath('error'));
}

module.exports = {
    GetMainPage,
    GetErrorPage
}