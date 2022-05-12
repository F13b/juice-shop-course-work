const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/admin-controller')
const createPath = require('../helpers/create-path');

router.get('/admins-panel', getUsers);

router.delete('/admins-panel/:id', deleteUser);

module.exports = router;