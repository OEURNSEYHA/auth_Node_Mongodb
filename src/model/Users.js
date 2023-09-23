const mongoose = require('mongoose');

const userShcema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userShcema)