const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
})


const commentModel = mongoose.model("commentModel",commentSchema);
module.exports = commentModel;