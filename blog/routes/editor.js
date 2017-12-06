const express = require("express");
const editor = express.Router();

const { ArticalModel, RegisterModel } = require("../models");

editor.all("/*", function(req, res, next) {
	if(req.session.userId) {
		next()
	} else {
		res.redirect("/login");
	}
});

editor.get("/", function(req, res, next) {
	const user = req.session.username;
	res.render("editor",{username: user});
});


editor.post("/", function(req, res, next) {
	const form = req.body;
	// console.log(form);
	const data = {
		author: req.session.userId,
		title: form.title,
		content: form.content,
	};
	// console.log(data);
	// console.log("userId:" req.session.userId);
	const artical = new ArticalModel(data);
	artical.save((err, doc) => {
		if(err) {
			console.log("Error :",err);
		}
		console.log(doc);
		const articalId = doc._id;
		RegisterModel.findById(data.author, (err, docs) => {
			if (docs.articals) {
				docs.articals.push(articalId);
			} else {
				docs.articals = [articalId];
			}
			docs.save();
			res.redirect("/user");
		});
	});
	// res.send("");

});

module.exports = editor;