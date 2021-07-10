const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SchemaJson = {
    Id: { type: Number, unique: true },
    name: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true, },
    dob: { type: Date, required: true },
    state: { type: String, trim: true, required: true }
}

const userSchema = mongoose.Schema(SchemaJson, { timestamps: true })
userSchema.plugin(AutoIncrement, { id: 'order_seq', inc_field: 'Id' });
module.exports = mongoose.model("user", userSchema)