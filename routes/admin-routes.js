const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, addUsersPage, addUser } = require('../controllers/admin-controller')

router.get('/admins-panel', getUsers);

router.get('/admins-panel/add-user', addUsersPage);

router.post('/admins-panel/add-user', addUser);

router.delete('/admins-panel/:id', deleteUser);

module.exports = router;