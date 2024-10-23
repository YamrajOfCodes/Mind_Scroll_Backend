const Router = require("express").Router();
const postController = require("../../Controller/Post/postController");
const postStorage = require("../../Multer/Post/postStorage");
const userauthenticate = require("../../Middleware/userauthenticate");

Router.post("/createpost",postStorage.single("post"),postController.createPost);
Router.get("/getposts",postController.getposts);
Router.get("/getsinglepost/:postId",postController.getSinglePost);
Router.delete("/deletepost/:postId",postController.deletepost);
Router.post("/addlike/:postId",userauthenticate,postController.addlike)
Router.post("/removelike/:postId",userauthenticate,postController.removelike)





Router.post("/addcomment/:postId",userauthenticate,postController.addComment);
Router.get("/getcomments/:postId",postController.getcomments);













module.exports = Router;