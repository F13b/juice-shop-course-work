const createPath = require('../helpers/create-path');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    User
    .find()
    .then((users) =>{
        res.render(createPath('admin-panel'), {users});
    })
    .catch((error) => console.log(error));
}

const deleteUser = (req, res) => {
    User
    .findByIdAndDelete(req.params.id)
    .then((result) =>{
        res.sendStatus(200).redirect('/shop');
    })
    .catch((error) => console.log(error));
}

const addUsersPage = (req, res) => {
    res.render(createPath('admin-add-users'))
}

const addUser = async (req, res) => {

    const {Name, Password,  ConfirmPassword, UserRole} = req.body;
    
    let candidate = await User.findOne({Name: Name});

    if (candidate) {
        res.send('Такой пользователь уже есть в системе');
    } else {
        if (Password == ConfirmPassword) {
            try {
                const Salt = await bcrypt.genSalt();
                const HashedPassword = await bcrypt.hash(Password, Salt);                
                new User({Name, Password: HashedPassword, Role: UserRole}).save().then(res.redirect('/admins-panel')).catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
                res.status(400).redirect('/error')
            }
        } else {
            res.status(400).json('Wrong conf pass')
        }
    }
}

module.exports = {
    getUsers,
    deleteUser,
    addUsersPage,
    addUser
}