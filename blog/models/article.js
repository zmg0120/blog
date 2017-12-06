const mongoose = require("mongoose");

const ArticalSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "register",
	},
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
	comments: [],
});

const ArticalModel = mongoose.model("artical",ArticalSchema,"artical");
module.exports = ArticalModel;