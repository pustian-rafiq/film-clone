const router = require('express').Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

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

router.post("/login", async (req, res) => {
    // const { email, password } = req.body
    try {
        //Check email
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong username and password!")

        //Check Password
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json("Wrong username and password!")
        //Create jwt before sending response
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.SECRET_KEY,
        {expiresIn: "5d"}
        )
        //Omit password from database doc
        var { password, ...info } = user._doc
        res.status(200).json({...info, accessToken})
    } catch (err) {
        console.log(err)
    }
})
module.exports = router