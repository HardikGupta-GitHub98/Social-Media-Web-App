const express = require("express");
const router = express.Router();
const passport = require("passport");

const postsController = require("../Controllers/posts_Controller");

router.post("/create", passport.checkAuthentication, postsController.create);

router.get(
	"/deletePost/:id",
	passport.checkAuthentication,
	postsController.deletePost
);

module.exports = router;
