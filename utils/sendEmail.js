const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Portfolio Contact Message",
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
