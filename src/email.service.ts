import nodemailer from "nodemailer";

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aidamohajer800@gmail.com",
    pass: "qzzs miii nncy oqmd",
  },
});

//send email
export async function sendEmail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: "aidamohajer800@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
}
