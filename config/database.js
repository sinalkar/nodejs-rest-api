const mongoose = require("mongoose")
const { MONGO_DB_URL } = process.env

module.exports.connect = async () => {
    mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => console.log('DB CONNECTED!'))
        .catch((error) => {
            console.error('DB ERROR', error)
            process.exit(1)
        })
}