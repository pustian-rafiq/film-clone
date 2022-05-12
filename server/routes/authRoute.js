const router = require('express').Router()
const User = require("../models/User")
var CryptoJS = require("crypto-js");

// Register the routes

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    try {

        const user = await newUser.save();
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Login

router.post("/login", async(req, res) => {
   // const { email, password } = req.body
    try {
        //Check email
        const user =await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong username and password!")

        //Check Password
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        
        originalPassword !== req.body.password &&  res.status(401).json("Wrong username and password!")

        //Omit password from database doc
        var {password, ...info} = user._doc
        res.status(200).json(info)
    } catch (err) {
        console.log(err)
    }
})
module.exports = router