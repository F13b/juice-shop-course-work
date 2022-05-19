const User = require('../models/User');
const Role = require('../models/Role')
const bcrypt = require('bcrypt');
const createPath = require('../helpers/create-path');
const jwt = require('jsonwebtoken');
const { secret } = require('../js/config');

function createToken(id, role) {
    const payload = {
        id, 
        role
    }

    return jwt.sign(payload, secret, {expiresIn: '2h'});
}

const Registrate = async (req, res) => {
    const {Name, Password, ConfirmPassword} = req.body;

    const candidate = await User.findOne({Name});

    if (!candidate) {
        if (Password == ConfirmPassword) {
            try {
                const Salt = await bcrypt.genSalt();
                const HashedPassword = await bcrypt.hash(Password, Salt);

                new User({Name, Password: HashedPassword, Role: 'User'}).save().then(res.redirect('/main')).catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
                res.render(createPath('reg'), { message: "Oops, something went wrong..."} );
            }
        } else {
            res.render(createPath('reg'), { message: "Passwords don't match!"} );
        }
    } else {
        res.render(createPath('reg'), { message: "This login is already occupied (´。＿。｀)"} );
    }
}

const Authorize = async (req, res) => {
    const {Name, Password} = req.body;

    const candidate = await User.findOne({Name})

    if (!candidate) {
        res.render(createPath('auth'), { message: "A user with this username was not found"} );
    } else {
        try {
            const validPassword = await bcrypt.compare(Password, candidate.Password);
            if (validPassword) {
                const token = createToken(candidate._id, candidate.Role);
                // res.send(token)
            } else {
                res.render(createPath('auth'), { message: "Incorrect login or password!"} );
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    Registrate,
    Authorize
}