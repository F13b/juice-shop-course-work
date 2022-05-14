const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, addUsersPage, addUser } = require('../controllers/admin-controller')
const createPath = require('../helpers/create-path');

router.get('/admins-panel', getUsers);

router.get('/admin-user-add', addUsersPage);

router.post('/admin-user-add', addUser);

router.delete('/admins-panel/:id', deleteUser);

module.exports = router;