const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

// Importing module to Extraxct JWT from the header .
const ExtractJWT = require("passport-jwt").ExtractJwt;
///////////////////////////////////////////////////
const User = require("../models/user");

//// key to encrypt the text from JWT
let opts = {
	// The Authos=risation is the key inside the header
	// Inside the Authorisation is the Bearer key Which is the JWt
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: "WebApp",
};
passport.use(
	new JWTStrategy(opts, function (jwtPayLoad, done) {
		User.findById(jwtPayLoad._id, function (err, user) {
			if (err) {
				console.log("Error In Looking For User In the Passport-jwt-strategy");
			} else if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
			return;
		});
	})
);
module.export = passport;
