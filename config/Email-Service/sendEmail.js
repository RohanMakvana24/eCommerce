import nodemailer from "nodemailer";
export const SendEmail = async (toEmail, subject, htmlContent, res) => {
  try {
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
      //response
      res.status(200).send({
        success: true,
        message: "The OTP and Secret Send To Your Email Check it...",
        data: toEmail,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Email is not sent",
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "The Problem with sending email of otp ❌",
    });
  }
};
