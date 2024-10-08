
const userDb = require("../Model/User/userModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY=process.env.SECRET_KEY;


const userauthenticate = async(req,res,next)=>{

  
  
    try {
      const token = req.headers.authorization;
      
      const verifyToken = jwt.verify(token,SECRET_KEY);
      
      const rootUser = await userDb.findOne({_id:verifyToken._id});
     
    
  
      
      if(!rootUser){
        throw new Error("user not found")
      }else{
  
        
        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id
        req.userMainId = rootUser.id
        
        next();
      }
  
  } catch (error) {
      res.status(400).json({error:"Unauthorized No token Provide"})
  }
  }

module.exports = userauthenticate;