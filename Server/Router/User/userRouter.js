const Router = require("express").Router();
const userStorage = require("../../Multer/User/userStorage");
const userController = require("../../Controller/User/userController");
const userauthenticate = require("../../Middleware/userauthenticate");

Router.post("/register",userController.Register);
Router.post("/login",userController.Login);
Router.post('/logout',userauthenticate,userController.Logout);



Router.get("/userverify",userauthenticate,userController.Userverify);








module.exports = Router;