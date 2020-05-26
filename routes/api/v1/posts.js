const express = require("express");
// this will not create a new instace of express
// instead it will use the instace created at the first call of express

//using the router function of the express module
const router = express.Router();

// Importing the posts_api controller
const posts_api = require("../../../Controllers/api/v1/posts_api");
router.get("/", posts_api.index);
router.delete("/:id", posts_api.deletePost);
module.exports = router;
