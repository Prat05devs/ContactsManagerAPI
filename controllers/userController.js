const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');  // Importing the user model

//@desc Register a user 
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!!");
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created: ${user}`);
    if (user) {
        res.status(201).json({ _id: user._id, email: user.email });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc Login user 
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const{email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!!");
    }
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id : user._id
            }, 
        }, process.env.ACCESS_TOKEN_SECERT,
        {expiresIn: '10m'});
        res.status(200).json({ accessToken });
        }
        else{
            res.status(401);
            throw new Error("Invalid password");
        }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Current user information' });
});

module.exports = { registerUser, loginUser, currentUser };
