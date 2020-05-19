const express = require("express");
const router = express.Router();

const postsController = require("../Controllers/posts_Controller");

router.post("/create", postsController.create);

module.exports = router;
