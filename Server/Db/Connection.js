const mongoose = require("mongoose");


     
     const  dbConnect = async()=>{
       const connect =  await mongoose.connect( process.env.DATABASE_CONNECT);

       if(connect){
        console.log("connected");
       }else{
        console.log("error while connect");
        
       }
    }
    

    module.exports = dbConnect;
