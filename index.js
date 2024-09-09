import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import AuthRoutes from "./routes/authRoutes.js";
import DBConnect from "./config/database/dbConnect.js";
import Authenticate from "./middleware/Authenticate.js";
import cookieParser from "cookie-parser";
import { Auth } from "./middleware/Auth.js";
import DashboardRoute from "./routes/dashoboardRoute.js";
import cloudinary from "cloudinary";
import AdminRoute from "./routes/adminRoute.js";
import CategoriesRoute from "./routes/categoriesRoute.js";
import SubCategoryRoute from "./routes/subCategoryRoute.js";
//DOTENV CONFIGURATION
dotenv.config({ path: "./config/.env" });

//DATABSE CONFIGffff
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
// Middleware to parse JSON bodies
server.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
server.use(cookieParser());
server.use(express.static("public"));
server.use(morgan("dev"));

//VIEW SETUP
server.set("view engine", "ejs");

//ROUTES
server.use("/api/v1/auth", AuthRoutes);
server.use("/", DashboardRoute);
server.use("/adminhandle", AdminRoute);
server.use("/categoryhandle", CategoriesRoute);
server.use("/subcategoryhandle", SubCategoryRoute);

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
