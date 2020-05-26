const express = require("express");
const router = express.Router();
//Importing the passport JS
const passport = require("passport");
const usersController = require("../Controllers/users_Controller");

/// The Path of the first Angument in .get function is relative to
//  the path mentioned in the first argument of Middleware where this module is called
// (in this case the middleware is present inside the index.js file of the routes)

// To handle "/Users" Request
router.get("/", function (req, res) {
	return res.end("<h1>All the Users</h1>");
});

// To handle the requests following "/Users"   eg="/Users/profile"
router.get(
	"/profile/:id",
	passport.checkAuthentication,
	usersController.profile
);

router.post(
	"/updateDetails/:id",
	passport.checkAuthentication,
	usersController.updateDetails
);
// To Render Form To Sign In For An Existing User
router.get("/user-sign-in", usersController.user_sign_in);
//  To Render SignUp Form
router.get("/user-sign-up", usersController.user_sign_up);
// To Create A user In The DataBase
router.post("/createUser", usersController.create);

// For this Router We give three arguments instead of two
// third argument is passort as a middleware to authenticate user
router.post(
	"/createSession",
	passport.authenticate("local", { failureRedirect: "/users/user-sign-in" }),
	usersController.createSession
);
router.get("/user-sign-out", usersController.destroySession);

// Authentication Using GoogleOauth
router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/users/user-sign-in" }),
	usersController.createSession
);

module.exports = router;
