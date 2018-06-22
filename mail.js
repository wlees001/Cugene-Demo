var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abhishek.purdue@gmail.com',
    pass: '######'
  }
});

var mailOptions = {
  from: 'abhishek.purdue@gmail.com',
  to: 'coolabhi01@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

// var mail = require('mail').Mail({
//   host: '####',
//   username: 'abhishek.purdue@gmail.com',
//   password: '####'
// });
// //Use the mailer to send messages:

// mail.message({
//   from: 'sender@example.net',
//   to: ['recipient@somewhere.org'],
//   subject: 'Hello from Node.JS'
// })
// .body('Node speaks SMTP!')
// .send(function(err) {
//   if (err) throw err;
//   console.log('Sent!');
// });
