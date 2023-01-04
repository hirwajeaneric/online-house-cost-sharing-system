const nodemailer = require("nodemailer");

exports.contractEmails = (emailsubject,theMessage, destination)=>{

    var from = "hirwaminerve25@gmail.com";
    var to1 = destination;
    var subject = emailsubject;
    var message1 = theMessage;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hirwaminerve25@gmail.com',
            pass: 'dimpywpcpdhaopxs'
        }
    });

    var mailOptions1 = {
        from: from,
        to: to1, 
        subject: subject,
        text: message1
    };

    transporter.sendMail(mailOptions1, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("Email Sent To Student: "+info.response);
        }
    })
}