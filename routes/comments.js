const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentsController = require("../Controllers/comments_Controller");

router.post(
	"/addComment",
	passport.checkAuthentication,
	commentsController.addComment
);
router.get(
	"/deleteComment/:id",
	passport.checkAuthentication,
	commentsController.deleteComment
);

module.exports = router;
