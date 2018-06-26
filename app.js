const express = require('express');
const app = express();
var path = require("path");
require('dotenv').config()
var port = process.env.PORT || 8080;

const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/science', function (req, res) {
  res.sendFile(path.join(__dirname + '/science.html'));
});

app.get('/careers', function (req, res) {
  res.sendFile(path.join(__dirname + '/careers.html'));
});

app.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname + '/contact.html'));
});

app.get('/tos', function (req, res) {
  res.sendFile(path.join(__dirname + '/tos.html'));
});

app.get('/privacy', function (req, res) {
  res.sendFile(path.join(__dirname + '/privacy.html'));
});

// POST route from contact form
app.post('/send', function (req, res) {
    let milOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      //service: 'yahoo mail',
      //port: 465,
      service:'Godaddy',
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });
    mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;',
      to: process.env.EMAIL,
      subject: 'New message from contact form at Cugene.com',
      text: `${req.body.message} from ${req.body.email}`
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
      if (error) {
        res.json('contact-failure');
        console.log(error)
      }
      else {
        // res.json('contact-success');
        res.redirect('/contact')
        console.log('sent')
        // let success = "Mail has been sent!";
        // $('.contact-us').append(success);
      }
    });
  });




app.use(express.static(__dirname + '/public')); //__dir and not _dir
app.listen(port);
console.log(`server on ${port}`);