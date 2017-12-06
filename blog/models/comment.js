const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	articalId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
});

const CommentModel = mongoose.model("comment",CommentSchema,"comment");
module.exports = CommentModel;