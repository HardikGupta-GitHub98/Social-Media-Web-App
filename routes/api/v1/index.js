const express = require("express");
// this will not create a new instace of express
// instead it will use the instace created at the first call of express

//using the router function of the express module
const router = express.Router();

// Importing the posts_api controller
const postsRouter = require("./posts");
router.use("/posts", postsRouter);

module.exports = router;
