const nodemailer = require("nodemailer");
const { USER, PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: USER,
    pass: PASS,
  },
});

transporter.verify().then(() => {
  console.log("ready for send emails");
});

module.exports = { transporter };
