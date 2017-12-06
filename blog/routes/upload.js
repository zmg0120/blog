const express = require("express");
const multer = require("multer");
const { RegisterModel } = require("../models");

const upload = express.Router();
const dest = "public/upload";

const uploadMid = multer({dest: dest});


upload.get("/", function(req, res, next) {
	const user = req.session.username;
	res.render("upload",{ username: user });
});

upload.post("/",uploadMid.single("image"), function(req, res, next) {
	console.log("form:", req.body);
	console.log("file:", req.file);
	const path = "/upload/" + req.file.filename;

	const id = req.session.userId;
	const user = req.session.username;
	RegisterModel.findById(id, (err, doc) => {
		if(err) {
			console.log("Error:",err);
		}
		console.log(doc);
		doc.avatar = path;
		doc.save();
	});

	res.render("upload", { imgPath: path, username: user});
	// res.send("上传成功");
});

module.exports = upload;