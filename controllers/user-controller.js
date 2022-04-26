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

const Authorize = async (req, res) => {
    const {Name, Password} = req.body;
    console.log(Name)

    const candidate = await User.findOne({Name: req.body.Name})

    if (candidate) {
        console.log(candidate)
        if (bcrypt.compareSync(Password, candidate.Password)) {
            res.render(createPath('account'), { "userID": candidate.id, "userRole": candidate.Role });
        }
    } else {
        console.log(candidate)
        res.redirect('/authorization');
    }
}

module.exports = {
    Registrate,
    Authorize
}