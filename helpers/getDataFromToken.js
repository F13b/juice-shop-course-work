const { secret } = require('../js/config');
const jwt = require('jsonwebtoken');

const getData = (request) => {
    let token = request.cookies.token;

    return data = jwt.verify(token, secret);
}

module.exports = getData;