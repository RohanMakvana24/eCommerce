import nodemailer from "nodemailer";
export const SendEmail = async (toEmail, subject, htmlContent) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "7888f4003@smtp-brevo.com",
      pass: "IhK0HYkaJAXBmbxU",
    },
  });

  let info = await transporter.sendMail({
    from: "rohanmakvana90@gmail.com",
    to: toEmail,
    subject: subject,
    html: htmlContent,
  });

  if (info.accepted.length > 0) {
    console.log("Email sent");
  } else {
    console.log("Email Not Send");
  }
};
