const User = require('../models/User');
const Role = require('../models/Role')
const bcrypt = require('bcrypt');
const createPath = require('../helpers/create-path');
const { secret } = require('../js/config');

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