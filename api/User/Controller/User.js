const userModel = require('../Model/User')

module.exports = {
    createUser: (req, res, next) => {
        userModel.create({
            Id: req.body.Id,
            name: req.body.name,
            address: req.body.address,
            dob: req.body.dob,
            state: req.body.state
        }, (err, result) => {
            if (err)
                res.json({ status: "failure", message: "Something went wrong", data: null })
            else
                res.json({ status: "success", message: "User added successfully!!!", data: null })

        })
    },
    getAllUsers: (req, res, next) => {
        let userList = []
        userModel.find({}, function (err, users) {
            if (err) {
                res.json({ status: "failure", message: "Something went wrong", data: null })
            } else {
                for (let userItem of users) {
                    userList.push({
                        Id: userItem.Id,
                        name: userItem.name,
                        address: userItem.address,
                        dob: userItem.dob,
                        state: userItem.state,
                        createdAt: userItem.createdAt
                    })
                }
                res.json({ status: "success", message: "User list found!", data: { users: userList } })
            }
        })
    },
    findUserById: (req, res, next) => {
        console.log(req.body)
        userModel.findById(req.params.Id, (err, foundUser) => {
            if (err) {
                res.json({ status: "failure", message: "Something went wrong", data: null })
            } else {
                res.json({ status: "success", message: "User found!", data: { users: foundUser } })
            }
        })
    },
    updateUserById: (req, res, next) => {
        userModel.findByIdAndUpdate(req.params.Id, { name: req.body.name }, (err, foundUser) => {
            if (err)
                res.json({ status: "failure", message: "Something went wrong", data: null })
            else {
                res.json({ status: "success", message: "User Detail Updated updated successfully!!!", data: { users: foundUser } })
            }
        })
    },
    deleteUserById: function (req, res, next) {
        userModel.findByIdAndRemove(req.params.Id, (err, foundUser) => {
            if (err)
                res.json({ status: "failure", message: "Something went wrong", data: null })
            else {
                res.json({ status: "success", message: "User deleted successfully!", data: { users: foundUser } })
            }
        })
    }
}