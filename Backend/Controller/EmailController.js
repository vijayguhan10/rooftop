let path = require("path");
let fs = require("fs");
const { sendEmail } = require("../emailService"); // Correct import
// const templates=require('../emailTemplate.html')
exports.emailparser = async (req, res) => {
  const { to, name } = req.body;
  let template = fs.readFileSync(
    path.join(__dirname, "../emailTemplate.html"),
    "utf-8"
  );

  template = template.replace("{{name}}", name);

  try {
    await sendEmail(to, "Welcome to Our Service!", template);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};
