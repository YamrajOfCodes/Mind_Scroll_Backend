const Router = require("express").Router();
const postController = require("../../Controller/Post/postController");
const postStorage = require("../../Multer/Post/postStorage");


Router.post("/createpost",postStorage.single("post"),postController.createPost);
Router.get("/getposts",postController.getposts);
Router.get("/getsinglepost/:postId",postController.getSinglePost);
Router.delete("/deletepost/:postId",postController.deletepost);












module.exports = Router;