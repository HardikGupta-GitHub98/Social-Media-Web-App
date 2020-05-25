const mongoose = require("mongoose");
// IMporting Multer For File Uploads
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

// To define the filename and the destination of the uploaded file
// the destination of the uploaded file is localdisk for now, therefore the following function for disk storage is used
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "..", AVATAR_PATH));
	},
	// fieldname is the type of file being uploaded eg-avatar
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now());
	},
});

// declaring some functions as static
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
	"avatar"
);
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);

module.exports = User;
