const createPath = require('../helpers/create-path');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    User
    .find()
    .then((users) =>{
        res.render(createPath('admin-panel'), {users, message: '' });
    })
    .catch((error) => console.log(error));
}

const deleteUser = (req, res) => {
    User
    .findByIdAndDelete(req.params.id)
    .then((result) =>{
        res.sendStatus(200).render(createPath('admin-panel'), { message: "Success!" });
    })
    .catch((error) => console.log(error));
}

const addUsersPage = (req, res) => {
    res.render(createPath('admin-add-users'), { message: '' })
}

const addUser = async (req, res) => {

    const {Name, Password,  ConfirmPassword, UserRole} = req.body;
    
    let candidate = await User.findOne({Name: Name});

    if (candidate) {
        res.render(createPath('admin-add-users'), { message: 'A user with this username is already in the system!' });
    } else {
        if (Password == ConfirmPassword) {
            try {
                const Salt = await bcrypt.genSalt();
                const HashedPassword = await bcrypt.hash(Password, Salt);                
                new User({Name, Password: HashedPassword, Role: UserRole})
                .save()
                .then(() => {
                    User
                    .find()
                    .then((users) =>{
                        res.render(createPath('admin-panel'), {users, message: 'Success!' });
                    })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
                res.status(400).redirect('/error')
            }
        } else {
            res.render(createPath('admin-add-users'), { message: "Passwords don't match!" });
        }
    }
}

module.exports = {
    getUsers,
    deleteUser,
    addUsersPage,
    addUser
}