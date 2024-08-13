import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import AuthRoutes from "./routes/authRoutes.js";
import DBConnect from "./config/database/dbConnect.js";
import Authenticate from "./middleware/Authenticate.js";
import cookieParser from "cookie-parser";
import { Auth } from "./middleware/Auth.js";
import DashboardRoute from "./routes/dashoboardRoute.js";
import cloudinary from "cloudinary";
import AdminRoute from "./routes/adminRoute.js";
//DOTENV CONFIGURATION
dotenv.config({ path: "./config/.env" });

//DATABSE CONFIG
DBConnect();
cloudinary.v2.config({
  cloud_name: "ds7xjkkhg",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
//SERVER SETUP
const port = process.env.PORT;
const server = express();

//MIDDLEWARE
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan("dev"));

//VIEW SETUP
server.set("view engine", "ejs");

//ROUTES
server.use("/api/v1/auth", AuthRoutes);
server.use("/", DashboardRoute);
server.use("/adminhandle", AdminRoute);
server.use((req, res) => {
  res.status(504).send({
    error: "Page not found",
  });
});
server.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).send({
      error: err.message,
    });
  } else {
    res.status(504).send({
      error: "Internal Server Error",
    });
  }
});

//SERVER LISTEN
server.listen(port, () => {
  console.log(`Server Listining on PORT : ${port}`);
});
