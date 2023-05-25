const express = require('express')
const cookieParser = require("cookie-parser")
const path = require("path")

const connectMongoDB = require("./db-connection.js");
const userRouter = require("./routes/user.js")

require('dotenv').config()

const PORT = process.env.PORT || 5000 ;
const app = express();

// connect mongobd
connectMongoDB(process.env.MONGO_ATLAS_URI)

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api",userRouter)

app.get("/",(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"../",'client','build')))
    res.sendFile(path.resolve(__dirname,"../",'client','build','index.html'))
})

app.listen(PORT,()=>{
    console.log(`my server starts at port ${PORT}`)
})