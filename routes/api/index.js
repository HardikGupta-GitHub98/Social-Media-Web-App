const express = require("express");
// this will not create a new instace of express
// instead it will use the instace created at the first call of express

//using the router function of the express module
const router = express.Router();
const apiRouter = require("./v1/index");
router.use("/v1", apiRouter);

module.exports = router;
