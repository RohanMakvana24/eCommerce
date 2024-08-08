import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.JWTSECRET);
    if (!decode) {
      res.render("backend/auth/login");
    }
    const User = await UserModel.findById(decode.id);
    req.user = User;
    next();
  } catch (error) {
    res.render("backend/auth/login");
  }
};
