const express = require("express");

const comment = express.Router();

const { CommentModel, ArticalModel } = require("../models");

comment.post("/", function(req, res, next) {
	// res.send("aaaa");
	const form = req.body;
	// console.log(form);
	const comment = new CommentModel(form);
	comment.save((err, doc) => {
		if(err) {
			console.log("Comment Error:",err);
		} 
		console.log(doc);
		ArticalModel.findById(doc.articalId, (err, docs) => {
			if(docs.comments) {
				docs.comments.push(doc._id);
			} else {
				docs.comments = [doc._id];
			}
			docs.save();
			res.send("true");
		});
	});
});

module.exports = comment;