const express = require('express');
const register = express.Router();
const { RegisterModel } = require("../models");

// const getCcap = require("../utils/getCaptcha");

register.get("/", function(req, res,next) {
	console.log("req::",req.body);
	// console.log("aaaaaaaaaaaaaaaaaaa");
	// getCcap(function(cap) {
	// 	console.log("cap text:",cap.text);
	// 	// req.session.captcha = cap.text;
	// 	res.render("register",{captcha: cap.buffer, text: cap.text});
	// });
	res.render("register");
});

register.post("/", function(req, res, next) {
	const form = req.body;
	console.log("Post :", form);
	if(!form.password){
		getCcap(function(cap) {
		console.log("cap text:",cap.text);
		res.send(cap);
		});
	}else{
		const reguser = new RegisterModel(form);
		console.log("reguser:::");
		reguser.save((err) => {
			if(err) {
				next(err);
			} else {
				res.redirect("login");
			}
		});
	}
	
});

module.exports = register;