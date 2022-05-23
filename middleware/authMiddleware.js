const jwt = require('jsonwebtoken');
const { secret } = require('../js/config');

module.exports = function (role) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.cookies.token;

            if (!token) {
                return res.redirect('/error')
            } else {
                const {role: userRole} = jwt.verify(token, secret);
                let hasRole = false;
                if (role == userRole) {
                    hasRole = true
                }

                if (!hasRole) {
                    return res.redirect('/error')
                }
                next();
            }
        } catch (e) {
            console.log(e)
            return res.redirect('/error')
        }
    }
}