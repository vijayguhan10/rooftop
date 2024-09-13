const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vijayguhan10@gmail.com",
    pass: "sdmyyyaivqkakjar",
  },
});

exports.sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: "vijayguhan10@gmail.com",
    to: to,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
