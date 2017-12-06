const mongoose = require("mongoose");

const RegisterModel = require("./register");
const ArticalModel = require("./article");
const CommentModel = require("./comment");

const url = "mongodb://localhost:27017/blog";

mongoose.Promise = global.Promise;
mongoose.connect(url, {
	useMongoClient: true
});

exports.RegisterModel = RegisterModel;
exports.ArticalModel = ArticalModel;
exports.CommentModel = CommentModel;