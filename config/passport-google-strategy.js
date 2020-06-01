const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

const environment = require("./environment");

// New Strategy For Google Oauth
passport.use(
	new googleStrategy(
		{
			clientID: environment.google_clientID,
			clientSecret: environment.google_clientSecret,
			callbackURL: environment.google_callbackURL,
		},
		function (accessToken, refreshToken, profile, done) {
			// find the user with given credentials
			User.findOne({ email: profile.emails[0].value }).exec(function (
				err,
				user
			) {
				if (err) {
					console.log("Error In Google Strategy Passport", err);
				} else {
					console.log(profile);

					if (user) {
						// if the user is found this is set as request.user ///
						done(null, user);
					} else {
						// if not found then the user is asked to signup////////////
						User.create(
							{
								name: profile.displayName,
								email: profile.emails[0].value,
								password: crypto.randomBytes(20).toString("hex"),
							},
							function (err, user) {
								if (err) {
									console.log(`Error In Creating the user ${err}`);
								} else {
									done(null, user);
								}
							}
						);
					}
				}
				return;
			});
		}
	)
);

module.exports = passport;
