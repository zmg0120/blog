var express = require('express');
var users = express.Router();
const { RegisterModel, ArticalModel } = require("../models");

/* GET users listing. */
users.get("/", function(req, res, next) {
	console.log(req.session.userId);
	if (req.session.userId) {
		next()
	} else {
		res.redirect("/login");
	}
}, function(req, res, next) {
	const user = req.session.username;
	
	// console.log(user);
	//查询数据库，如果有avatar  avatar = 数据库数据， 如果没有 等于默认路径
	
	const id = req.session.userId;
	
	console.log(id);
	console.log(user);
	let pathAvatar;
	RegisterModel.findById(id, (err, doc) => {
		if(err) {
			console.log("Error:",err);
		}
		// console.log("doc::",doc);
		// console.log("doc.avatar",doc.avatar);
		ArticalModel.find({author: id},function(err, docs) {
			console.log(docs);
			if(!doc.avatar) {
				pathAvatar  = "/static/img/01.jpg";
				res.render("usercenter", {username: user, avatar: pathAvatar, articals: docs});
			} else {
				pathAvatar = doc.avatar;
				res.render("usercenter", {username: user, avatar: pathAvatar, articals: docs});
			}
		});
			
		// console.log("path:::",pathAvatar);
		// res.render("usercenter", {username: user, avatar: pathAvatar});
	});
})

users.get("/logout", function(req, res, next) {
	req.session.destroy();
	res.redirect("/");
})

module.exports = users;
