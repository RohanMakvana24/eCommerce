import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
const Authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(500).send({
      success: false,
      message: "Access Denied: Authorization not define",
    });
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res.status(500).send({
      success: false,
      message: "Bearer not define",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    const User = await UserModel.findById(id);
    const tokenCheck = await UserModel.find({
      Token: {
        $elemMatch: {
          AuthToken: token,
        },
      },
    });
    if (!User || !tokenCheck) {
      return res.status(500).send({
        success: false,
        message: "Access Denied: you are not authenticate",
      });
    }
    req.user = User;
    req.token = token;
    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export default Authenticate;
