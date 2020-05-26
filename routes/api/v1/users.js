const express = require("express");
// this will not create a new instace of express
// instead it will use the instace created at the first call of express

//using the router function of the express module
const router = express.Router();

const usersApi = require("../../../Controllers/api/v1/users_api");
router.get("/createSession", usersApi.createSession);

module.exports = router;
