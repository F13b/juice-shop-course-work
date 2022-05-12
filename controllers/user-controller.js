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

                const userRole = await Role.findOne({Name: 'Manager'});
                new User({Name, Password: HashedPassword, Role: userRole.Name}).save().then(res.redirect('/main')).catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
                res.status(400).json('Oops....')
            }
        } else {
            res.status(400).json('Wrong conf pass')
        }
    } else {
        res.status(400).json('Go to home, bitch!')
    }
}

const Authorize = async (req, res) => {
    const {Name, Password} = req.body;

    const candidate = await User.findOne({Name})

    if (!candidate) {
        res.status(400).json('Not found')
    } else {
        try {
            const validPassword = await bcrypt.compare(Password, candidate.Password);
            if (validPassword) {
                const token = createToken(candidate._id, candidate.Role);
                // res.send(token)
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