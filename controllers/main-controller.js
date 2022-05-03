const createPath = require('../helpers/create-path');

const GetMainPage = (req, res) => {
    res.render(createPath('index'));
}

module.exports = {
    GetMainPage
}