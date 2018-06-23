const express = require('express');
const app = express();
var path = require("path");

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

// POST route from contact form
app.post('/send', function (req, res) {
    let milOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      //service: 'yahoo mail',
      //port: 465,
      service:'gmail',
      secure: true,
      auth: {
        user: 'leelandclenista@gmail.com',
        pass: 'Thronehodor23!'
      }
    });
    mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;',
      to: 'leelandclenista@gmail.com',
      subject: 'New message from contact form at Cugene.com',
      text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
      if (error) {
        res.json('contact-failure');
        console.log(error)
      }
      else {
        res.json('contact-success');
        console.log('sent')
      }
    });
  });




app.use(express.static(__dirname + '/public')); //__dir and not _dir
var port = 8000; // you can use any port
app.listen(port);
console.log('server on' + port);