const userModel = require('../Model/User')
const moment = require('moment')

module.exports = {
    createUser: (req, res, next) => {
        // console.log('Req', req.body)

        const createUserObject = {
            name: req.body.name,
            address: req.body.address,
            dob: req.body.dob,
            state: req.body.state
        }
        userModel.create(createUserObject, (err, result) => {
            if (err) {
                res.status(500).json({ status: "failure", message: "Something went wrong", data: null, err: err.message })
            }
            else {
                const userItem = { ...result._doc }
                userItem.dob = moment(userItem.dob).format('YYYY-MM-DD')
                console.log(userItem)
                res.status(200).json({ status: "success", message: "User added successfully!!!", data: userItem })
            }
        })
    },
    getAllUsers: (req, res, next) => {
        let userList = []
        userModel.find({}, function (err, users) {
            if (err) {
                res.status(500).json({ status: "failure", message: "Something went wrong", data: null })
            } else {
                for (let userItem of users) {
                    userList.push({
                        Id: userItem.Id,
                        name: userItem.name,
                        address: userItem.address,
                        dob: moment(userItem.dob).format('YYYY-MM-DD'),
                        state: userItem.state,
                        createdAt: userItem.createdAt
                    })
                }
                res.status(200).json({ status: "success", message: "User list found!", data: { users: userList } })
            }
        })
    },
    findUserById: (req, res, next) => {
        console.log(req.params)
        const Id = parseInt(req.params.id)
        userModel.findOne({ Id: Id }, (err, foundUser) => {
            if (err) {
                res.status(500).json({ status: "failure", message: "Something went wrong", data: null, err: err.message })
            } else {
                const { Id, name, address, dob, state, createdAt } = foundUser._doc
                const dobm = moment(dob).format('YYYY-MM-DD')

                res.status(200).json({ status: "success", message: "User found!", data: { users: { Id, name, address, dob: dobm, state, createdAt } } })
            }
        })
    },
    updateUserById: (req, res, next) => {
        const Id = parseInt(req.params.id)
        const updateFields = { name: req.body.name, address: req.body.address, dob: req.body.dob, state: req.body.state }
        userModel.findOneAndUpdate({ Id: Id }, { name: req.body.name, address: req.body.address, dob: req.body.dob, state: req.body.state }, (err, foundUser) => {
            if (err)
                res.status(500).json({ status: "failure", message: "Something went wrong", data: null, err: err.message })
            else {
                if (foundUser) {
                    res.status(200).json({ status: "success", message: "User Detail Updated updated successfully!!!", data: { users: { Id: foundUser.Id, ...updateFields } } })
                } else {
                    res.status(404).json({ status: "failure", message: "User not found!", data: null })
                }
            }
        })
    },
    deleteUserById: function (req, res, next) {
        const Id = parseInt(req.params.id)
        userModel.findOneAndDelete({ Id: Id }, (err, foundUser) => {
            if (err)
                res.status(500).json({ status: "failure", message: "Something went wrong", data: null })
            else {
                if (foundUser) {
                    res.status(200).json({ status: "success", message: "User deleted successfully!", data: { users: foundUser } })
                } else {
                    res.status(404).json({ status: "failure", message: "User not found!", data: null })
                }
            }
        })
    }
}