const express = require('express') // bring this in so we can make our router
const Wish = require('../models/wish')


/////
// Create Router  variable to attach rooutes
/////

const router = express.Router() // router will have all routes attached to it

//routes

// seed route
router.get("/seed", async (req,res) => {
    await Wish.remove({})
    const wishes = await Wish.create([
        {name: "Hammer", price: 12, image:"jpg", link:"placeholder"},
        {name: "teaset", price: 50, image:"jpg", link:"placeholder"},
        {name: "jacket", price: 120, image:"jpg", link:"placeholder"}
    ])
    res.json(wishes)
})

// INDUCES

// Index Route
router.get("/", async (req, res) => {
    const wishes = await Wish.find({})
    res.render("wishes/index.ejs", {wishes})
})
// New Route
router.get("/new", (req, res) => {
    res.render("wishes/new.ejs")
})
// Destroy Route
router.delete("/:id", async (req, res) => {
    await Wish.findByIdAndRemove(req.params.id)
    res.redirect("/wish")
})
// Update Route

// Create Route
router.post("/", async (req, res) => {
    await Wish.create(req.body)
    res.redirect("/wish")
})
// Edit Route

// Show route
router.get("/:id", async (req, res) => {
    const wish = await Wish.findById(req.params.id)
    res.render("wishes/show.ejs", {wish})
})

module.exports = router