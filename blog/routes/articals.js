const express = require("express");
const articals = express.Router();

const { ArticalModel, CommentModel } = require("../models");

articals.get("/:id", function(req, res, next) {
	// console.log(req);

	const id = req.param("id");
	// const id = req.params.id; ok
	ArticalModel.findById(id, (err, doc) => {
		if(err) {
			console.log(err);
		}
		// console.log(doc);
		CommentModel.find({articalId: id}, (err, docs) => {
			console.log("comment docs:", docs);
			const data = {
				username: req.session.username, 
				title: doc.title, 
				content: doc.content, 
				articalId: id, comment:docs
			};
			res.render("articals", data);
		});
		
	});

});

module.exports = articals;

