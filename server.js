// import
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const WishRouter = require("./controllers/wish")
const UserRouter = require("./controllers/user")


// create express app
const app = express()

// register middleware
app.use(morgan("tiny")) // announcement video said "dev"
app.use( express.static("public")) // took out the "/static"
app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"))
app.use(
    session({
        secret: process.env.SECRET,
        store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
        saveUninitialized: true,
        resave: false,
    })
);

// Routes & Routers
app.use("/wish", WishRouter)
app.use("/user", UserRouter)

app.get("/", (req, res)=> {
    res.render("index.ejs")
})
// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`))