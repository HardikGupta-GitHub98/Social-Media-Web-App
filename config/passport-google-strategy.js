const passport = require("passport");
const googleStrategy = require("passport-google-oauth").Oauth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
	new googleStrategy(
		{
			clientID:
				"975622839403-lmpbsev171micvroki3m2sp7nk54spo2.apps.googleusercontent.com ",
			clientSecret: "OincxMWqMc1L8LHNwR1k3ZTi",
			callbackURL: "http://localhost:8000/users/auth/goolge/callback",
		},
		function (accessToken, refreshToken, profile, done) {
			User.findOne({ email: profile.emails[0].value }).exec(function (
				err,
				user
			) {
				if (err) {
					console.log("Error In Google Strategy Passport", err);
				} else {
					console.log(profile);

					if (user) {
						done(null, user);
					} else {
						User.create(
							{
								name: profile.displayname,
								emaail: profile.emails[0].value,
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
