
const admin  = require("firebase-admin")
const config = require("./firbaseconfig")
admin.initializeApp({
    credential:admin.credential.cert(config),
    databaseURL: "url here"
})

const express = require("express")
require("dotenv").config();
const cors = require("cors")
const authroute = require("./routes/auth")
const catroute = require("./routes/catagory")
const userRoute = require("./routes/user")
const postRoute = require("./routes/posts")
const multer = require("multer")
const app = express()
app.use(express.json())
app.use(cors())
const path = require("path")

const Port = process.env.PORT || 5000;

app.use("/images",express.static(path.join(__dirname,"/images")))
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"Images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})

app.use("/api/auth",authroute)
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/category",catroute)
const start = async()=>{

    try{
    app.listen(Port,()=>{
    console.log("server is up at ",Port);
    
        })
  } catch (error) {
        console.log("some error occur");
    }
}

start()

