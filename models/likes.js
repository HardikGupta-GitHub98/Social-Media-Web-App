const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		likeable: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			// to tell that this is a dynamic reference////
			//refPath is stores another field of the Schema which tells
			// what kind of Objects can have like
			//OR
			//If the ref of an object is more than one then refPath is u
			// used to define them inside another field of the same schema
			// in this case the field id "onModel"
			refPath: "onModel",
		},
		onModel: {
			type: String,
			required: true,
			// this is the list of objects or modles that can have likes
			enum: ["Post", "Comment"],
		},
	},
	{
		timestamps: true,
	}
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
