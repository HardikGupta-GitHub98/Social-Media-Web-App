const express = require("express");
// this will not create a new instace of express
// instead it will use the instace created at the first call of express

//using the router function of the express module
const router = express.Router();

// Importing the posts Router
const postsRouter = require("./posts");
router.use("/posts", postsRouter);

// Importing the Users Router
const usersRouter = require("./users");
router.use("/users", usersRouter);

module.exports = router;
