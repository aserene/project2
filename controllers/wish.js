const express = require("express") // bring this in so we can make our router
const Wish = require("../models/wish")


/////
// Create Router  variable to attach routes
/////

const router = express.Router()

router.use((req, res, next) => {
    console.log(req.session)
    if(req.session.loggedIn) {
        next()
    } else {
        res.redirect("/user/login")
    }
})

//routes

// seed route
// router.get("/seed", async (req,res) => {
//     await Wish.remove({})
//     const wishes = await Wish.create([
//         {name: "Hammer", price: 12, image:"jpg", link:"placeholder"},
//         {name: "teaset", price: 50, image:"jpg", link:"placeholder"},
//         {name: "jacket", price: 120, image:"jpg", link:"placeholder"}
//     ])
//     res.json(wishes)
// })


// INDUCES is the order that routes should be created

// Index Route
// router.get("/", async (req, res) => {
    //     const wishes = await Wish.find({})
    //     res.render("wishes/index.ejs", {wishes})
    // })
router.get("/", async (req, res) => {
        console.log(req.session)
        Wish.find({username: req.session.username}, (err, wishes) => {
            res.render("wishes/index.ejs", { wishes, user: req.session.username })
          })
        .catch(err => console.log(err))
})
    // New Route
router.get("/new", (req, res) => {
    res.render("wishes/new.ejs", {user: req.session.username})
})
// Destroy Route
router.delete("/:id", async (req, res) => {
    await Wish.findByIdAndRemove(req.params.id)
    res.redirect("/wish")
})
// Update Route
router.put("/:id", async (req,res) => {
    await Wish.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect("/wish")
})
// Create Route
router.post("/", async (req, res) => {
    req.body.username = req.session.username
    await Wish.create(req.body, (err, createdWish) => {
        console.log('created' , createdWish, err)
        res.redirect("/wish")
    })
})
// Edit Route
router.get("/:id/edit", async (req, res) => {
    const wish = await Wish.findById(req.params.id)
    res.render("wishes/edit.ejs", { wish, user: req.session.username})
})
// Show route
router.get("/:id", async (req, res) => {
    const wish = await Wish.findById(req.params.id)
    res.render("wishes/show.ejs", {wish, user: req.session.username})
})

module.exports = router