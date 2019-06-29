var express=require('express');
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
var app=express();
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465, //587
    secure: true, // true for 465, false for other ports
    auth: {
        user: "smtp.frcoder@gmail.com",
        pass: "frcoder6581"
    }
});
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kausar.frcoder@gmail.com',
    pass: 'blissgarden'
  }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/


var allowCrossDomain = (req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.use(allowCrossDomain);
app.use(bodyParser.json({ limit: "50mb" }));

app.post('/send',function(req,res){
//return console.log(req.body);
    var msg="<strong>Dear Admin</strong><br>";
        msg+="<p>You have receive enquiry from Positrust</p>";
        msg+="<p>Please find the details below:</p>";
        msg+="<p>Name   :"+req.body.name+"</p>";
        msg+="<p>Email   :"+req.body.email+"</p>";
        msg+="<p>Number   :"+req.body.phone+"</p>";
        msg+="<p>City   :"+req.body.city+"</p>";
        msg+="<p>Address   :"+req.body.address+"</p>";
        msg+="<p>Comment   :"+req.body.comment+"</p>";

    var mailOptions={
        from: '"Positrust Visitors" <Positrust@example.com>',
        //to : req.body.email,
		to : 'kausar.frcoder@gmail.com',
        subject : req.body.subject,
        html : msg,
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){ 
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log(JSON.stringify(response));
            console.log("Message sent: " + response.messageId);
            //res.end("sent");
			res.json(response);
         }
    });
});



/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});