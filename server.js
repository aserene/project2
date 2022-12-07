// import
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const WishRouter = require("./controllers/wish")


// create express app
const app = express()

// register middleware
app.use(morgan("tiny")) // announcement video said "dev"
app.use( express.static("public")) // took out the "/static"
app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"))

// Routes & Routers
app.get("/", (req, res)=> {
    res.send("Server is working")
})
app.use("/wish", WishRouter)

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`))