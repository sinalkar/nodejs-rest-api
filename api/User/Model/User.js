const mongoose = require("mongoose");

const SchemaJson = {
    Id: { type: Number, unique: true },
    name: { type: String, trim: true },
    address: { type: String, trim: true },
    dob: { type: Date },
    state: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now }
}

module.exports = mongoose.model("user", new mongoose.Schema(SchemaJson));