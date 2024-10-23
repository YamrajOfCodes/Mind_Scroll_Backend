const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    Date:{
        type:String
    },
    postusername:{
        type:String
    },
    postuser:{
        type:String
    },
    heading:{
        type:String,
        required:true
    },
    postimg:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likes:{
        type:Array
    }
})


const postModel = mongoose.model("postModel",postSchema);
module.exports = postModel