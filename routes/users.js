const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/myappdb');

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    profileImaige: String,
    contact: Number,
    bord: {
        typeof: Array,
        default: []
    }
})
userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema)