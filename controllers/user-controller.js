const User = require('../models/User');
const createPath = require('../helpers/create-path');
const bcrypt = require('bcrypt');

const Registrate = (req, res) => {
    const {Name, Password, ConfirmPassword} = req.body;

    if (Password == ConfirmPassword) {
        try {
            const Salt = bcrypt.genSaltSync();
            const Hash = bcrypt.hashSync(Password, Salt);

            const user = new User ({Name, "Password": Hash, 'Role': 'Nahal'});
            user
                .save()
                .then((result) => res.redirect('/main'))
                .catch((error) => console.log(error));

        } catch (error) {
            console.log(error);
        }
    } else {
        return JSON.stringify({"message": 'Пароли не совпадают'})
    }
}

const Authorize = (req, res) => {
    const {Name, Password} = req.body;

    User.findOne({Name: Name})
        .then((result) => {
            console.log(result)
            res.redirect('/account')
        })
        .catch(error => console.log(error))
}

module.exports = {
    Registrate,
    Authorize
}