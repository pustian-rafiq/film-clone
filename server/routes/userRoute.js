const router = require('express').Router()
const User = require("../models/User")
const verify = require('../verifyToken')
const CryptoJS = require("crypto-js");

// Update routes
router.put("/:id", verify, async (req, res) => {
    console.log("req.params.id",req.params.id)
    console.log("req.user.id",req.user)
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{
                new: true
            });
            res.status(200).json(updatedUser)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You can update only your account!")
    }

})

module.exports = router