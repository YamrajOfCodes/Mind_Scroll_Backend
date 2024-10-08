const postDb = require("../../Model/Post/postModel");
const cloudinary = require("../../Cloudinary/Cloudinary");

const createPost = async(req,res)=>{

    try {
        const {heading,content,postuser,postusername} = req.body;
        if(!heading || !content || !postuser || !postusername){
            return res.status(400).json({error:"Both fields are required"})
        }

        const samepost = await postDb.findOne({heading});

        if(samepost){
            res.status(400).json({error:"Post already exists"});
        }else{

            const file = req.file?.path;
            
            const upload = await cloudinary.uploader.upload(file);

            const date = new Date().toLocaleDateString();
            const newPost = new postDb({
                Date:date,heading,content,postimg:upload.secure_url,postuser,postusername
            })

            await newPost.save();


            res.status(200).json(newPost);
        }


    } catch (error) {
        console.log(error);
        
    }

}

const getSinglePost = async(req,res)=>{

try {
    const {postId} = req.params;
    const fetchpost = await postDb.findOne({_id:postId});
    res.status(200).json(fetchpost);
} catch (error) {
    console.log(error);
    
}

}

const getposts = async(req,res)=>{

    try {
        const getposts = await postDb.find({}).sort({_id:-1});
        res.status(200).json(getposts);
      } catch (error) {
        console.log(error);
        
      }
}

const deletepost = async(req,res)=>{
    try {
        const {postId} = req.params;
        const fetchpost = await postDb.findOneAndDelete({_id:postId});
        res.status(200).json(fetchpost);
    } catch (error) {
        console.log(error);
        
    }
}











module.exports = {createPost,getposts,getSinglePost,deletepost}