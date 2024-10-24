const postDb = require("../../Model/Post/postModel");
const cloudinary = require("../../Cloudinary/Cloudinary");
const Commentdb = require("../../Model/Comment/comentsModel");

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
                Date:date,heading,content,postimg:upload.secure_url,postuser,postusername,likes:0
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

const addlike = async(req,res)=>{
    try {
        const {name} = req.body;
        const islike = "red"
        let relike = 0;
    //   console.log(req.params);

      const {postId} = req.params
      
        // console.log("postid",postId);
        
       const post = await postDb.findOne({_id:postId});
        //  console.log(post);

         if(post.likes.length > 0){
            post.likes.map((element)=>{
                if(name==element.name){  
                    relike= relike +1;
                }
                else{
                  relike = 0;
                } 

            })

            // console.log("count",relike);
            

            // console.log("relike",relike);
            
            
            
            if(relike>0){
               return res.status(400).json({error:"already given like"})
            }else{
                post.likes = [...post.likes,{name}]
                await post.save();
                
            }
            
        }else{
            console.log(post.likes.length);
            
            post.likes = {name}
            await post.save();
        }

        // console.log(post);
        
        
        
        // post.likes = post.likes + 1;

        // await post.save();

        // console.log(post);


        res.status(200).json(post.likes);
        
        
    } catch (error) {
        console.log(error);
        
    }
}



const removelike = async(req,res)=>{
        const {name} = req.body;
        const islike="white"
        // console.log("name is ",name);
        const {postId} = req.params;
        let relike = 0;
       const post = await postDb.findOne({_id:postId});
        //  console.log("post likes",post.likes.length);

         if(post.likes.length > 0){
         const newlikes =   post.likes.filter((element)=>{
                  return name !== element.name;
            })

            // console.log("newlikes",newlikes);

            post.likes = newlikes;

            await post.save();


            // console.log("post",post.likes);

              const response = {
                like:post.likes,
            islike
        }
        res.status(200).json(response);
            
            }

            
        }





 const addComment  = async(req,res)=>{
    try {

        const {id,username,comment} = req.body

        const existing = await Commentdb.findOne({id,username});
        if(existing){
            await Commentdb.findByIdAndDelete({_id:existing._id});
             const newcomment = new Commentdb({
            id,username,comment
        })

        await newcomment.save()

        res.status(200).json(newcomment);
        }else{
             const newcomment = new Commentdb({
            id,username,comment
        })

        await newcomment.save()

        res.status(200).json(newcomment);
        }
        
    } catch (error) {
        console.log(error);
        
    }
 }


 const getcomments = async(req,res)=>{
    try {
        const { postId } = req.params;

        // console.log(postId);
        

        const getallcomments = await Commentdb.find({id:postId});
        if(getallcomments){
            return res.status(200).json(getallcomments);
        }
    } catch (error) {
        console.log(error);
        
    }
 }
        
        
    
        
        











module.exports = {createPost,getposts,getSinglePost,deletepost,addlike,removelike,addComment,getcomments}