const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, META_USER } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_USER,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "smolianko_12345@meta.ua" };
  await transport.sendMail(email);
  console.log("Email send success");
  return true;
};

module.exports = sendEmail;
