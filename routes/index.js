const express = require("express");
// this will not create a new instace of express
// instead it will use the instace created at the first call of express

//using the router function of the express module
const router = express.Router();

// Directing any Get Request for "/"
const homeController = require("../Controllers/home_Controller");
router.get("/", homeController.home);

////////////////////Directing any request For the "/users/"////////////////..

// Importing the Router For Users
const userRouter = require("./users");
///////using this usersRouter To direct The "/users" request to the users file///
router.use("/users", userRouter);

const postRouter = require("./posts");
router.use("/posts", postRouter);

const commentRouter = require("./comments");
router.use("/comments", commentRouter);

//  Router For API
const apiRouter = require("./api");
router.use("/api", apiRouter);

//Exporting the router to the main index.js file
module.exports = router;
