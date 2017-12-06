const mongoose = require("mongoose");

const RegisterSchema = mongoose.Schema({
	username: {
		type: String,
		// match: /[a-zA-Z][0-9a-zA-Z_-]{3,20}/,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	email: {
		type: String,
	},
	avatar: {
		type: String,
	},
	status: Boolean, // true: 正常， false: 禁用
	createAt: {
		type: Date,
		default: Date.now
	},
	articals: [],
});

const RegisterModel = mongoose.model("register", RegisterSchema, "register");

module.exports = RegisterModel;