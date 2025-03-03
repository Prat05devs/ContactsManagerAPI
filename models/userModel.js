const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "please add the username"]
    },
    email: {
        type: String, 
        required: [true, "please add the user email address"],
        unique: true
    },
    password: {
        type: String, 
        required: [true, "Please add the user password"]
    }, 
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);