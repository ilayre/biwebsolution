const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");


const express = require("express");
const app = express();

dotenv.config();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function(req, res){
	res.render("./index");
});

app.get("/about", function(req, res){
	res.render("about");
});


// app.listen(3000, function(){
// 	console.log("server listen on port 3000");
// });


app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server has started");
});