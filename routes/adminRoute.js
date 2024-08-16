import express from "express";
import {
  add_admin_page,
  allAdmin,
  deleteAdmin,
  deleteProfile,
  manage_admin,
  NewUploadProfile,
} from "../controllers/adminController.js";
import Authenticate from "../middleware/Authenticate.js";
import upload from "../middleware/multer.js";
import AuthRoutes from "./authRoutes.js";
import { authenticator } from "otplib";

const AdminRoute = express.Router();

//Admin-Page : GET
AdminRoute.get("/add-admin-page", add_admin_page);

//Admin-manage-page : GET
AdminRoute.get("/manage-admin-page", manage_admin);

//Profile upload for new user
AdminRoute.post(
  "/profile-upload",
  Authenticate,
  upload.single("file"),
  NewUploadProfile
);

///uploded temp profile delete
AdminRoute.post("/delete-temp-profile", Authenticate, deleteProfile);

//get admin all
AdminRoute.get("/getadmins", Authenticate, allAdmin);

//delete admin
AdminRoute.delete("/delete-admin/:id", Authenticate, deleteAdmin);
export default AdminRoute;
