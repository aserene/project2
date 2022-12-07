//////////////////////////////////////////////
//////// Wish Model
///////////////////////////////////////////////
const mongoose = require('./connection')

const { Schema, model } = mongoose // destructuring, grabbing model and Schema off mongoose variable
// mongoose.Schema
// mongoose.model


const wishSchema = new  Schema({
    name: String,
    price: Number,
    image: String,
    link: String
})

const Wish = model("Wish", wishSchema)

module.exports = Wish