const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
// Authentication Using Passport
passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
		},
		function (email, password, done) {
			// done is a callback function inside the passport js
			// find a user and establish identity
			User.findOne({ email: email }, function (err, user) {
				if (err) {
					console.log(`Error In Finding User ::${err}`);
					// done takes two arguments
					// the first one Is error If it exists
					// the second one is boolean argument ehic tells
					// Whether the Entered Crediantials Are
					// Authenticalted or not
					return done(err);
				}
				//if user doesnt exist in DB or Password Is Incorrect
				else if (!user || user.password != password) {
					console.log(`Invalid username/Password`);

					// the second argument of done tells us that the user is noy authenticated
					return done(null, false);
				} else {
					return done(null, user);
					// here the two arguments of done function
					// tell that there is no error in finding the user
					// and the user is found  as well
				}
			});
		}
	)
);

// serializing the user to Keep the user.id inside a cookie
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

// Deseiralising the user from the userid Stored In the  Cookie
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		if (err) {
			console.log(`Error In Finding User ::${err}`);
			return done(err);
		} else {
			return done(null, user);
		}
	});
});

// Check If the User Is Authenticated
passport.checkAuthentication = function (req, res, next) {
	// using the inbuilt isAuthenticated function
	if (req.isAuthenticated()) {
		return next();
	}
	// if the user is not authenticated
	else {
		return res.redirect("/users/user-sign-in");
	}
};

passport.setAuthenticatedUser = function (req, res, next) {
	if (req.isAuthenticated()) {
		// req.user contains the information of the signed in user from the session cookie
		// transferring this information to the response
		res.locals.user = req.user;
	}
	next();
};

module.exports = passport;
