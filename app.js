require("dotenv").config()
require("./config/database").connect()
const express = require("express")
const cors = require("cors")
const app = express()
const jwt = require("jsonwebtoken")
const users = require('./routes/user.routes');
const validateUser = require('./middleware')
app.use(cors())
// app.use(express.json())

const { JWT_SECRET } = process.env

app.set('JWT_SECRET', JWT_SECRET); // jwt secret token

// private access
app.use('/users', users);





app.get('/', function (req, res) {
    res.json({ "Message": "Welcome" });
});

// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.json({ status: "failure", respcode: 404, message: "Something went wrong", data: null })
    else
        res.json({ status: "failure", respcode: 500, message: "Something went wrong", data: null })
});

module.exports = app