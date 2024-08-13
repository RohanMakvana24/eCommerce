import nodemailer from "nodemailer";
export const SendEmail = (toEmail, subject, htmlContent) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rohanmakvana90@gmail.com",
      pass: "yxly scxy terz xhph",
    },
  });

  var mailOptions = {
    from: "rohanmakvana90@gmail.com",
    to: toEmail,
    subject: subject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
