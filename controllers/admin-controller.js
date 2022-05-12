const createPath = require('../helpers/create-path');
const User = require('../models/User');

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
        res.sendStatus(200).redirect('/admins-panel');
    })
    .catch((error) => console.log(error));
}

module.exports = {
    getUsers,
    deleteUser
}