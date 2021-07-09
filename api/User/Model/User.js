const mongoose = require("mongoose")

const SchemaJson = {
    Id: { type: Number, unique: true, required: true },
    name: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true, },
    dob: { type: Date, required: true },
    state: { type: String, trim: true, required: true },
    createdAt: { type: Date, default: Date.now }
}

module.exports = mongoose.model("user", new mongoose.Schema(SchemaJson))