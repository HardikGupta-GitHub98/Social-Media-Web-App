const express = require("express");

//Requiring the dotenv
require("dotenv").config();
// Requiring the morgan library for logging the file
const logger = require("morgan");

// Requirirng the environment variable file
const environment = require("./config/environment");
// Importing Cookie Parser
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.WEBAPP_PORT;
console.log(process.env.NODE_ENV);

console.log(process.env);

const db = require("./config/mongoose.js");
//Importing the express-session package and the passport
// and passport local
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-strategy");
// importing connect-mongo
const MongoStore = require("connect-mongo")(session);

// Importing express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");
// Importing CONNECT-FLASH
const flash = require("connect-flash");

// Using Custom MiddleWre From Config For Flash Messages;
const customMiddleware = require("./config/customMiddlware");

// Requiring the SOCKET.IO AND USING IT
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log(`Chat Server Is Listening On Port :> ${5000}`);

// Encoding Every request and Its Body
app.use(express.urlencoded());

// MiddleWare To use Cookie-Parser
app.use(cookieParser());

// Settting up the Assets Folder For Static Files
const assets = express.static(environment.asset_path);

// make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(assets);

// Setting up mrogan to log files
app.use(logger(environment.morgan.mode, environment.morgan.options));
// Middleware to use Layouts;
// It sholud be Imoprted Before Importing Routers
app.use(expressLayouts);

///////////////////
app.get("env"); ///////////////////////
//////////////////

// Setting the Style tag and the Script Tags Of individual pages inside the head of the payout.ejs page
// This should be just below the app.use(expressLayouts)
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Setting Up the View Engine to  render the HTML page as response to a request
app.set("view engine", "ejs");
// to set the path for getting the HTML files from
app.set("views", "./views");

// Using Express-Session As A middleWare
app.use(
	session({
		name: "social-media-app",
		// TODO change the Secret Before Deployment
		secret: environment.session_cookie_key,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},
		store: new MongoStore(
			{
				mongooseConnection: db,
				autoRemove: "disabled",
			},
			function (err) {
				console.log(err || "connect-mongodb setup ok ");
			}
		),
	})
);
// to use passport and express- session
app.use(passport.initialize());
app.use(passport.session());
// to send the user's data to the views
app.use(passport.setAuthenticatedUser);

// Using Connect-Flash To Store Messages Inside the Session Cookie
app.use(flash());

// Using the Custom middleWare
app.use(customMiddleware.setFlash);

// importing the router which is exported by routes //
const router = require("./routes/index");

// Middleware To use the above imported router from ////routes/index.js
app.use("/", router);

app.listen(port, function (err) {
	if (err) {
		console.log(`Error in Running The Server : ${err}`);
	} else {
		console.log(`Server Is Live At Port: ${port}`);
	}
	return;
});
