const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:String,
    password:String
})

const User = new mongoose.model("user", userSchema);

module.exports = User;

