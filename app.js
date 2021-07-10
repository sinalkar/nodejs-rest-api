require("dotenv").config()
require("./config/database").connect()
const express = require("express")
const cors = require("cors")
const app = express()
const jwt = require("jsonwebtoken")
const users = require('./routes/user.routes');
const validateUser = require('./middleware')


app.use(express.json())
app.use(cors())


const { JWT_SECRET, USERNAME, PASSWORD } = process.env

app.set('JWT_SECRET', JWT_SECRET); // jwt secret token

app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).json({ status: "failure", message: "Username Passowrd required!" })
        }
        if (USERNAME === username && PASSWORD === password) {
            // Create token
            const token = jwt.sign(
                { usrNm: USERNAME },
                JWT_SECRET,
                {
                    expiresIn: "1min",
                }
            );

            return res.status(200).json({ status: "success", message: "Login Successfull!", data: { token } })
        }
        return res.status(400).json({ status: "failure", message: "Invalid credential!", data: null })
    } catch (err) {
        return res.status(500).json({ status: "failure", message: "Something went wrong!", err: err.message })
    }
});

// private access
app.use('/users', validateUser, users);
app.get('/', function (req, res) {
    res.json({ status: "success", message: "Welcome!", data: null })
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