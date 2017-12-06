var express = require('express');
var login = express.Router();
const { RegisterModel } = require("../models");


/* GET home page. */
login.get("/", function(req, res,next) {
	res.render("login");
});

//验证用户名是否重复
login.post("/", function(req, res, next) {
	const form = req.body;
	// console.log("Post :", form);
	if(!form.password) {
		RegisterModel.findOne(form)
		.then((doc) => {
			if(doc) {
				res.send("true");
			} else {
				res.send("");
			}
		})
	} else {
		RegisterModel.findOne({username: form.user})
		.then((doc) => {
			// console.log("doc::",doc);
			if (!doc) {
				// console.log("Emputy Doc");	
				return res.render("login", {
					errMessage: "登录失败 用户不存在 User: " + form.user
				});
			}
			if (doc.password === form.password) {
				req.session.userId = doc._id;
				req.session.username = doc.username;
				// console.log("验证成功！",req.session);
				res.redirect("/");
			} else {
				return res.render("login", {
					errMessage: "登录失败 密码错误 User: " + form.user
				});
			}
		})
		.catch((err) => {
			console.log("Error :", err);	
			next(err);
		});
	}
});

module.exports = login;