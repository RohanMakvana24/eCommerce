import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";
import { SendEmail } from "../config/Email-Service/sendEmail.js";
import { EmailTemplate } from "../templates/EmailTemp.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js";
//@ SIGNUP API
//@ POST
export const Signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    //Validaion
    if (!firstname || !lastname || !email || !password) {
      return res.status(404).send({
        success: false,
        message: "All field are required",
      });
    }

    //Email Validation
    const User = await UserModel.findOne({ email: email });
    if (User) {
      return res.status(404).send({
        success: false,
        message: "The Email is already ragistered try another email",
      });
    }

    //password hasing
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    //store
    const newUser = await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    res.status(201).send({
      success: true,
      message: "The User Ragistered Succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error,
    });
  }
};

//@ SIGNIN API
//@ POST
export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "All fields are required",
      });
    }

    //Email
    const User = await UserModel.findOne({ email: email });
    if (!User) {
      return res.status(404).send({
        success: false,
        message: "Email is not ragistered try signup",
      });
    }
    //Password Check
    const matchPass = await User.comparePassword(password);

    if (!matchPass) {
      return res.status(404).send({
        success: false,
        message: "Password is incorrect",
      });
    }

    //Token Generates
    const Token = await User.generateToken();

    // Response
    await User.save();
    res.status(200).cookie("token", Token, { httpOnly: true }).send({
      success: true,
      message: "The User Login Succefully",
      User: User,
      Token: Token,
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//@ RESET PASSWORD API
//@ POST
export const ResetPassword = async (req, res) => {
  try {
    const { _id } = req.user;
    const { oldPassword, newPassword } = req.body;

    //Validation
    if (!oldPassword || !newPassword) {
      return res.status(504).send({
        success: false,
        message: "All Fields are required",
      });
    }

    //User Find
    const User = await UserModel.findById(_id);
    console.log(User);
    //Old Password Check
    const oldPassCheck = await bcrypt.compare(oldPassword, User.password);
    if (!oldPassCheck) {
      return res.status(404).send({
        success: false,
        message: "Old Password is wrong",
      });
    }

    //Hash New Password
    const HashedNewPass = await bcrypt.hash(newPassword, 10);
    User.password = HashedNewPass;
    await User.save();

    res.status(200).send({
      success: true,
      message: "The User Password Reset Succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//@ FORGOT PASSWORD FORM
//@ GET
export const ForgotPassword_Page = async (req, res) => {
  res.render("backend/auth/Forgot-Password/EmailSend");
};
//@ FORGOT PASSWORD CHECK AND SEND OTP THROUGH THE EMAIL API
//@ POST
export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //Validation
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "The Email is required",
      });
    }

    //Email Check
    const User = await UserModel.findOne({ email: email });
    if (!User) {
      return res.status(404).send({
        success: false,
        message: "Email is Wrong",
      });
    }

    //OTP And Secret Generates
    const Secret = authenticator.generateSecret();
    const OTP = authenticator.generate(Secret);
    const subject = "Forgot Password Authenticate";
    const htmlContent = EmailTemplate(OTP);

    //Store OTP
    User.OTP = OTP;
    await User.save();
    //Send Email
    SendEmail(email, subject, htmlContent);

    //response
    res.status(200).send({
      success: true,
      message: "The OTP and Secret Send To Your Email Check it...",
      data: email,
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//@ FORGOT PASSWORD OTP VERIFY
//@ POST
export const PasswordOTPVerify = async (req, res) => {
  try {
    var { OTP } = req.body;

    //validation
    if (!OTP) {
      return res.status(404).send({
        success: false,
        message: "All fields are required",
      });
    }

    //OTP And Secret Verify
    const verify = await UserModel.findOne({ OTP });

    if (verify) {
      verify.OTP = "";
      await verify.save();
      return res.status(200).send({
        success: true,
        message: "Succefull The OTP Verification",
        data: verify.email,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Unsuccefull The OTP Verification",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//@ FORGOT PASSWORD THAN GENERATES NEW PASSWORD
//@ POST
export const newPassword = async (req, res) => {
  try {
    const { email, password, cpassword } = req.body;
    if (!password || !cpassword) {
      return res.status(404).send({
        success: false,
        message: "All Fields are required",
      });
    }

    //PAssword and confirm password check
    if (password !== cpassword) {
      return res.status(404).send({
        success: false,
        message: "All Fields are required",
      });
    }

    //hash Password
    const hashedpass = await bcrypt.hash(password, 10);
    //Find and Store
    const User = await UserModel.find({ email: email });
    if (!User) {
      return res.status(404).send({
        success: false,
        message: "The User are not found",
      });
    }

    const update = await UserModel.findByIdAndUpdate(User[0]._id, {
      password: hashedpass,
    });

    //response
    res.status(200).send({
      success: true,
      message: "The Password Forgot Succefully",
    });
  } catch (error) {
    console.log(error);
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//@ LOGOUT
//@ GET
export const Logout = async (req, res) => {
  try {
    const token = req.token;

    req.user.Token = req.user.Token.filter((currentToken) => {
      return currentToken.AuthToken !== token;
    });
    await req.user.save();

    res.clearCookie("token");
    return res.status(200).send({
      success: true,
      message: "User Logout Succefully",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//@ GET CURRENT USER
//@ GET

export const getCurrentUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const User = await UserModel.findById(_id);
    const newUser = {
      fname: User.firstname,
      lname: User.lastname,
      email: User.email,
    };

    res.status(200).send({
      success: true,
      message: "Get Current User Succefully",
      data: User,
    });
  } catch (error) {
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//@ Update User Profile
//@ POST
export const UploadProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await UserModel.findById(_id);
    //validation
    if (!req.file) {
      res.status(404).send({
        success: false,
        message: "image is required",
      });
    }

    const file = await getDataUri(req.file);

    // delete preview image
    // await cloudinary.v2.uploader.destroy(user.profilePic.public_id);

    //update
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    //save
    await user.save();
    res.status(200).send({
      success: true,
      message: "The Profile Updated Succefully",
      data: {
        public_id: cdb.public_id,
        url: cdb.secure_url,
        _id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//@ UPDATE A USER
//@ POST

export const UpdateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const { fname, lname, email } = req.body;

    //validation
    if (!fname || !lname || !email) {
      res.status(404).send({
        success: false,
        message: "All fields are required ",
      });
    }

    //validate user
    if (!_id) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //Update
    const User = await UserModel.findByIdAndUpdate(_id, {
      firstname: fname,
      lastname: lname,
      email: email,
    });

    res.status(200).send({
      success: true,
      message: "User Updated Succefully",
      data: User,
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};
