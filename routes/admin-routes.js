const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUsers, deleteUser, addUsersPage, addUser } = require('../controllers/admin-controller');

router.get('/admins-panel', authMiddleware('Administrator'), getUsers);

router.get('/admins-panel/add-user', authMiddleware('Administrator'), addUsersPage);

router.post('/admins-panel/add-user', authMiddleware('Administrator'), addUser);

router.delete('/admins-panel/:id', authMiddleware('Administrator'), deleteUser);

module.exports = router;