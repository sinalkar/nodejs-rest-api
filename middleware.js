const jwt = require("jsonwebtoken")
const validateUser = (req, res, next) => {
    jwt.verify(req.headers['authentication'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            // res.json({ status: "error", message: err.message, data: null });
            next();
        } else {
            // add user id to request
            req.body.userName = decoded.usrNm;
            next();
        }
    });

}

module.exports = validateUser