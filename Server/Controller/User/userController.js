const userDb = require("../../Model/User/userModel");
const bcrypt = require("bcrypt");




const Register = async(req,res)=>{
   
    try {
        const {Firstname,Lastname,email,password,phone} = req.body;

    
        

        if(!Firstname || !Lastname || !email || !password || !phone){
            return res.status(400).json({error:"All fields are required"})
        }

        const userPresent  = await userDb.findOne({email});

        if(userPresent){
            return res.status(400).json({error:"user is already exist"});
        }


        const newuser = new userDb({
            Firstname,Lastname,email,password,phone
        });

        await newuser.save();

        res.status(200).json(newuser);


    } catch (error) {
        console.log(error);
        
    }
  
}

const Login = async(req,res)=>{

    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"all fields are required"});
        }

        const validuser = await userDb.findOne({email});
        
        if(!validuser){
            return res.status(400).json({error:"please register first"});
        }

        const validpass = await bcrypt.compare(password,validuser.password);

        if(!validpass){
           return res.status(400).json({error:"Password does not matched"});
        }

        const token = await validuser.generateToken();

        const result = {
            validuser,
            token
        }

        res.status(200).json(result);
    } catch (error) {
        
    }

}

const Logout = async(req,res)=>{


    try {
        
        req.rootUser.tokens = req.rootUser.tokens.filter((element)=>{
            return element !== req.token
        })

        await req.rootUser.save();

        res.status(200).json(req.rootUser)

    } catch (error) {
        
    }
}

const Userverify = async(req,res)=>{
    try {

       
        
        const validuser = await userDb.findOne({_id:req.userId});
       

        if(validuser){
            res.status(200).json(validuser)
        }else{
            res.status(400).json({error:"invalid admin"})
        }

    } catch (error) {
        console.log(error);
    }

}

module.exports={Register,Login,Logout,Userverify};