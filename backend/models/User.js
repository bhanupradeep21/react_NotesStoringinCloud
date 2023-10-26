const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name:{
        type: String,
        name: true
    },
    email:{
        type: String,
        email: String,
        unique: true
    },
    password:{
        type: String,
        password: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User