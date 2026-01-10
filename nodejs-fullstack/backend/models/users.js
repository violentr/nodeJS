const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {type: String, default: null},
    lastName:{type: String, default: null},
    userName:{type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    token: {type: String},
});

module.exports = mongoose.model("user", userSchema);