const nodemailer = require("nodemailer");
const { createEmailToken } = require("./token.service");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

const verifyEmail = async (email) => {
  const token = await createEmailToken(email);
  const html = `<a href="http://localhost:3000/api/auth/verify/${token}">Verify email</a>`;
  await sendEmail(email, "NDJS verification account", html);
};

module.exports = {
  verifyEmail,
};
