import express from "express";
import {
  add_admin_page,
  allAdmin,
  deleteAdmin,
  deleteProfile,
  EditAdmin,
  exportCSV,
  exportPdf,
  getEditAdminPage,
  getPreviewPageAdmin,
  manage_admin,
  NewUploadProfile,
  UpdateAdmin,
} from "../controllers/adminController.js";
import Authenticate from "../middleware/Authenticate.js";
import upload from "../middleware/multer.js";
import AuthRoutes from "./authRoutes.js";
import { authenticator } from "otplib";
import { Auth } from "../middleware/Auth.js";

const AdminRoute = express.Router();

//Admin-Page : GET
AdminRoute.get("/addadminpage", add_admin_page);

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

//Edit Admin
// AdminRoute.get("/editadmin/:id", EditAdmin);

//Admin-Preview  : GET
AdminRoute.get("/preview-admin-page/:id", getPreviewPageAdmin);

//Admin-Edit  : GET
AdminRoute.get("/edit-admin-page/:id", getEditAdminPage);

//Update-Admin : POST 
AdminRoute.post("/update-admin/:id", UpdateAdmin)

//Export CSV File
AdminRoute.post("/export-csv", exportCSV)
AdminRoute.post("/export-pdf", exportPdf)

export default AdminRoute;
