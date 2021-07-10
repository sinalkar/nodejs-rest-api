const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose)
const moment = require('moment')

const SchemaJson = {
    Id: { type: Number, unique: true },
    name: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true, },
    dob: {
        type: Date, required: true,
        validate: {
            validator: (ipDob) => {
                var today = moment();
                const mObj = moment(ipDob, "YYYY-MM-DD")
                const diff = today.diff(mObj, 'years')

                return mObj.isValid() && diff >= 18
            },
            message: "You must provide valid Date of Birth and Age must be 18+!."
        }
    },
    state: { type: String, trim: true, required: true }
}

const userSchema = mongoose.Schema(SchemaJson, { timestamps: true })
userSchema.plugin(AutoIncrement, { id: 'order_seq', inc_field: 'Id' });
module.exports = mongoose.model("user", userSchema)