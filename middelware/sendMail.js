const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "sayogdonga156156@gmail.com",
//     pass: "zbplyxpskegounvfw",
//   },
// });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL_FOR_SENDEMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: "your_email@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}

module.exports = sendEmail;
