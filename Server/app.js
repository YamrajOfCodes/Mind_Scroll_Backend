const express = require("express");
const app = express();
const dbConnect = require("./Db/Connection");
const cors = require("cors");
const dotenv = require("dotenv").config({path:"./store.env"})



app.use(cors("*"));

app.use(express.json());

// userRoutes

const userRouter = require("./Router/User/userRouter");
app.use("/user/api",userRouter);

// postRoutes

const postRouter = require("./Router/Post/postRoutes");
app.use("/post/api",postRouter);

dbConnect();

const Port = process.env.PORT || 5000
app.listen(Port,()=>{
    console.log("listening");
    
})
