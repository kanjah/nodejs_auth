const nodemailer = require("nodemailer")
//import from .env
const { AUTH_EMAIL, AUTH_PASS } = process.env
let transporter = nodemailer.createTransport({
    host: "stmp-mail.outlook.com",
    port: 587,
    service: "hotmail",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
    }
})

//test transporter
transporter.verify((error, success) => {
    if (error) {
        console.log("Ready for messages")
    }
    else {
        console.log("REady for messages")
        console.log(success)
    }
})

const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions)
        return;
    }
    catch (error) {
        throw error;
    }
}

module.exports = sendEmail;