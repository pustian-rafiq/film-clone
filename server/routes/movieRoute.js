const router = require('express').Router()
const Movie = require("../models/Movie")
const verify = require('../middleware/verifyToken')
const CryptoJS = require("crypto-js");

//Movie create routes
router.post("/create", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body)
        try {
            const savedMovie = await newMovie.save()
            res.status(200).json(savedMovie)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})

//Movie update routes
router.put("/update/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedMovie)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})
//Movie delete routes
router.delete("/delete/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
             await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("Movie has been deleted...")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})
//Get single movie routes
router.get("/find/:id", verify, async (req, res) => {

        try {
            const movie = await Movie.findById(req.params.id)
            res.status(200).json(movie)
        } catch (err) {
            res.status(500).json(err)
        }
})
//Get all movie routes
router.get("/all", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const allMovies = await Movie.find()
            res.status(200).json(allMovies)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})
//Get random movie routes
router.get("/random", verify, async (req, res) => {
    
    const type = req.query.type;
    let movie;

        try {
            
            if(type === "series"){
                movie = await Movie.aggregate([
                    {$match: { isSeries: true}},
                    {$sample:{ size: 1}},
                ])
            }else{
                movie = await Movie.aggregate([
                    {$match: { isSeries: false}},
                    {$sample:{ size: 1}},
                ])
            }
            res.status(200).json(movie)
        } catch (err) {
            res.status(500).json(err)
        }
    
})

module.exports = router