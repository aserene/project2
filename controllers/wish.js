const express = require('express') // bring this in so we can make our router
const Wish = require('../models/wish')


/////
// Create Router  variable to attach rooutes
/////

const router = express.Router() // router will have all routes attached to it

router.get('/', (req, res) => {

    // Get all fruits from mongo and send them back
    Wish.find({ })
    .then((wish) => {
        // res.json(fruits)
        res.render('wishes/index.ejs', { wish })
    })
    .catch(err => console.log(err))

})