const jwt = require("jsonwebtoken")
const validateUser = (req, res, next) => {
    jwt.verify(req.headers['authorization'], req.app.get('JWT_SECRET'), function (err, decoded) {
        if (err) {
            res.status(401).json({ status: "failure", message: "Session is expire please login!", err: err.message })
        } else {
            // add user id to request
            req.body.userName = decoded.usrNm;
            next();
        }
    });

}

module.exports = validateUser