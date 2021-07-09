const express = require('express')
const router = express.Router()
const users = require('../api/User/Controller/User')

// Create New User
router.post('/', users.createUser)

// Retrieve all users
router.get('/', users.getAllUsers)

// Retrieve a single User with id
router.get('/:id', users.findUserById)

// Update a User with id
router.put('/:id', users.updateUserById)

// Delete a User with id
router.delete('/:id', users.deleteUserById)

module.exports = router