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

    return jwt.sign(payload, secret, {expiresIn: '24h'});
}

const Registrate = async (req, res) => {
    const {Email, Password, ConfirmPassword} = req.body;

    const candidate = await User.findOne({Email});

    if (!candidate) {
        if (Password == ConfirmPassword) {
            try {
                const Salt = await bcrypt.genSalt();
                const HashedPassword = await bcrypt.hash(Password, Salt);

                new User({Email, Password: HashedPassword, Role: 'User'}).save().then(res.redirect('/main')).catch((error) => console.log(error));
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
    const {Email, Password} = req.body;

    const candidate = await User.findOne({Email})

    if (!candidate) {
        res.render(createPath('auth'), { message: "A user with this username was not found"} );
    } else {
        try {
            const validPassword = await bcrypt.compare(Password, candidate.Password);
            if (validPassword) {
                const token = createToken(candidate._id, candidate.Role);
                res.cookie('token', token, {
                    httpOnly: true
                })
                res.redirect('/account');
            } else {
                res.render(createPath('auth'), { message: "Incorrect login or password!"} );
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const Logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/main')
}

const GetUserPage = async (req, res) => {
    const token = req.cookies.token;
    const user_data = jwt.verify(token, secret);

    let user = await User.findById(user_data.id)

    res.render(createPath('account'), {Email: user.Email});
}

module.exports = {
    Registrate,
    Authorize,
    Logout,
    GetUserPage
}