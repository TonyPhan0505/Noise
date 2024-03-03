const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

let mailOptions = {
    from: process.env.EMAIL,
    to: "",
    subject: "",
    text: ""
};

module.exports = (to, subject, message) => {
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.text = message;
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email sent: ${info.response}.`);
        }
    });
}