import express from "express";
import isEmptyBody from "../middleware/isEmptyBody.js";
import ValidateBody from "../decorates/validateBody.js";
import SignupSchema from "../utils/Validation-Schema/Auth-Back/signupValidation.js";
import {
  ForgotPassword,
  ForgotPassword_Page,
  Logout,
  newPassword,
  PasswordOTPVerify,
  ResetPassword,
  Signin,
  Signup,
} from "../controllers/AuthControllers.js";
import signinValidationSchema from "../utils/Validation-Schema/Auth-Back/signinValidation.js";
import Authenticate from "../middleware/Authenticate.js";
import ResetPasswordSchema from "../utils/Validation-Schema/Auth-Back/ResetPasswordValidation.js";
import ForgotPasswordSchema from "../utils/Validation-Schema/Auth-Back/ForgotPasswordSchema.js";
import { authenticator } from "otplib";
import { Auth } from "../middleware/Auth.js";
const AuthRoutes = express.Router();

//SignUp POST
AuthRoutes.post("/signup", isEmptyBody, ValidateBody(SignupSchema), Signup);

//SignUp GET
AuthRoutes.get("/login-page", (req, res) => {
  res.render("backend/auth/login");
});

//SignIn POST
AuthRoutes.post(
  "/signin",
  isEmptyBody,
  ValidateBody(signinValidationSchema),
  Signin
);

//Reset Password
AuthRoutes.post(
  "/resetPassword",
  isEmptyBody,
  Authenticate,
  ValidateBody(ResetPasswordSchema),
  ResetPassword
);

//Forgot Password GET Form of email check
AuthRoutes.get("/forgotpasswordpage1", ForgotPassword_Page);
//Forgot Password
AuthRoutes.post("/forgot-password", isEmptyBody, ForgotPassword);

//Forgot Password OTP Verify Page
AuthRoutes.get("/verifyotp-page", (req, res) => {
  res.render("backend/auth/Forgot-Password/VerifyOTP");
});
//Forgot Password OTP verify
AuthRoutes.post("/verify-otp", isEmptyBody, PasswordOTPVerify);

//Forgot Password Create a new Password
AuthRoutes.get("/newPasssword-page", (req, res) => {
  res.render("backend/auth/Forgot-Password/newPassword");
});
AuthRoutes.post(
  "/new-password",
  isEmptyBody,
  ValidateBody(ForgotPasswordSchema),
  newPassword
);

AuthRoutes.get("/logout", Authenticate, Logout);
export default AuthRoutes;
