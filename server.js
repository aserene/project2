// import
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

// create express app
const app = express()

// establish mongo connection
mongoose.connect(process.env.DATABASE_URL)

// mongoose connection events
mongoose.connection
    .on("open", () => console.log("Connected to Mongo"))
    .on("close", () => console.log("Disconnected from Mongo"))
    .on("open", (error) => console.log(error))

// register middleware
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"))

// Routes & Routers
app.get("/", (req, res) => {
    res.send("<h1>Server is working</h1>")
})

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`))