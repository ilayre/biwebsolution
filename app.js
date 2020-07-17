const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const fs = require('fs');


const express = require("express");
const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function(req, res){
	res.render("./index");
});

app.get('/sitemap.xml', function(req, res) {
	res.sendFile('sitemap.xml');
});

app.get("/contact_send", function(req, res){
	res.render("contact_send");
});

app.get("/contact_error", function(req, res){
	res.render("contact_error");
});

app.post("/contact_send", function(req, res){
	const output = `
		<P>new contact request</p>
		<h3>details</h3>
		<ul>
			<li>Email: ${req.body.email}</li>
			<li>Name: ${req.body.name}</li>
			<li>Phone: ${req.body.phone}</li>
			<li>message: ${req.body.message}</li>
		</ul>
	`;

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: process.env.EMAIL_ADDRESS,
		  pass: process.env.EMAIL_PASSWORD 
		}
	});
	
	  // send mail with defined transport object
	let mailOptions = {
		from: mail, // sender address
		to: 'contact@bisolutions.co.il', // list of receivers oruzal85@gmail.com orbarberdog@gmail.com
		subject: "מישהו יצר איתך קשר", // Subject line
		text: "מתעניין חדש", // plain text body
		html: output // html body
	};
	
	transporter.sendMail(mailOptions, function(err, data) {
		if(err){
			console.log(err);
			return res.render("contact_error");
		} else{
			console.log('email sent!');
			return res.render("contact_send");
		}
	});
});


// app.listen(3000, function(){
// 	console.log("server listen on port 3000");
// });


app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server has started");
});