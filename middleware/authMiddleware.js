const jwt = require('jsonwebtoken');
const { secret } = require('../js/config');

module.exports = function (role) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(403).json('non auth')
            }

            const {role: userRole} = jwt.verify(token, secret);
            let hasRole = false;
            if (role == userRole) {
                hasRole = true
            }

            if (!hasRole) {
                return res.status(403).json('nan')
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json('non auth')
        }
    }
}