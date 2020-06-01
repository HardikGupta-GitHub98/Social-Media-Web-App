// importing the files for setting up the  loggers
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream("file.log", {
	interval: "1d",
	path: logDirectory,
});

const development = {
	name: "development",
	asset_path: "./assets",
	session_cookie_key: "AnythingForNow",
	db: "SocialApp_Development",
	smtp: {
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: "hardikgupta80@gmail.com",
			pass: "9560085276",
		},
	},
	google_clientID:
		"975622839403-lmpbsev171micvroki3m2sp7nk54spo2.apps.googleusercontent.com",
	google_clientSecret: "OincxMWqMc1L8LHNwR1k3ZTi",
	google_callbackURL: "http://localhost:8000/users/auth/google/callback",
	jwt_key_or_secret: "WebApp",
	morgan: {
		mode: "dev",
		options: { stream: accessLogStream },
	},
};
const production = {
	name: "production",
	asset_path: "./assets",
	session_cookie_key: process.env.WEBAPP_SESSION_COOKIE_KEY,
	db: "SocialApp_Production",
	smtp: {
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.WEBAPP_SMTP_AUTH_USER,
			pass: process.env.WEBAPP_SMTP_AUTH_PASS,
		},
	},
	google_clientID: process.env.WEBAPP_GOOGLE_CLIENT_ID,
	google_clientSecret: process.env.WEBAPP_GOOGLE_CLIENT_SECRET,
	google_callbackURL: process.env.WEBAPP_GOOGLE_CALLBACK_URL,
	jwt_key_or_secret: process.env.WEBAPP_JWT_KEY_OR_SECRET,
	morgan: {
		mode: "combined",
		options: { stream: accessLogStream },
	},
};

module.exports =
	eval(process.env.NODE_ENV) == undefined
		? development
		: eval(process.env.NODE_ENV);
