const userModel = require('../Model/User')

module.exports = {
    createUser: (req, res, next) => {
        // console.log('Req', req.body)
        userModel.create({
            name: req.body.name,
            address: req.body.address,
            dob: req.body.dob,
            state: req.body.state
        }, (err, result) => {
            if (err)
                res.json({ status: "failure", message: "Something went wrong", data: null, err: err.message })
            else
                res.json({ status: "success", message: "User added successfully!!!", data: result })

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
                        _id: userItem._id,
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
        console.log(req.params)
        const Id = parseInt(req.params.id)
        userModel.findOne({ Id: Id }, (err, foundUser) => {
            if (err) {
                res.json({ status: "failure", message: "Something went wrong", data: null, err: err.message })
            } else {
                res.json({ status: "success", message: "User found!", data: { users: foundUser } })
            }
        })
    },
    updateUserById: (req, res, next) => {
        const Id = parseInt(req.params.id)
        const updateFields = { name: req.body.name, address: req.body.address, dob: req.body.dob, state: req.body.state }
        userModel.findOneAndUpdate({ Id: Id }, { name: req.body.name, address: req.body.address, dob: req.body.dob, state: req.body.state }, (err, foundUser) => {
            if (err)
                res.json({ status: "failure", message: "Something went wrong", data: null, err: err.message })
            else {
                if (foundUser) {
                    res.json({ status: "success", message: "User Detail Updated updated successfully!!!", data: { users: { Id: foundUser.Id, ...updateFields } } })
                } else {
                    res.json({ status: "failure", message: "User not found!", data: null })
                }
            }
        })
    },
    deleteUserById: function (req, res, next) {
        const Id = parseInt(req.params.id)
        userModel.findOneAndDelete({ Id: Id }, (err, foundUser) => {
            if (err)
                res.json({ status: "failure", message: "Something went wrong", data: null })
            else {
                if (foundUser) {
                    res.json({ status: "success", message: "User deleted successfully!", data: { users: foundUser } })
                } else {
                    res.json({ status: "failure", message: "User not found!", data: null })
                }
            }
        })
    }
}