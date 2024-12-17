import express from "express";
import {
  add_admin_page,
  allAdmin,
  deleteAdmin,
  deleteProfile,
  exportCSV,
  exportPdf,
  getEditAdminPage,
  getPreviewPageAdmin,
  importJSON,
  manage_admin,
  NewUploadProfile,
  UpdateAdmin,
} from "../controllers/adminController.js";
import Authenticate from "../middleware/Authenticate.js";
import upload from "../middleware/multer.js";
import { Auth } from "../middleware/Auth.js";

const AdminRoute = express.Router();

//Admin-Page : GET
AdminRoute.get("/addadminpage", Auth, add_admin_page); //✅

//Admin-manage-page : GET
AdminRoute.get("/manage-admin-page", Auth, manage_admin); //✅

//Profile upload for new user
AdminRoute.post(
  "/profile-upload",
  Authenticate,
  upload.single("file"),
  NewUploadProfile
); //✅

///uploded temp profile delete
AdminRoute.post("/delete-temp-profile", Authenticate, deleteProfile); //✅

//get admin all
AdminRoute.get("/getadmins", Authenticate, allAdmin); //✅

//delete admin 
AdminRoute.delete("/delete-admin/:id", Authenticate, deleteAdmin); //✅

//Admin-Preview  : GET
AdminRoute.get("/preview-admin-page/:id", Auth, getPreviewPageAdmin);  //✅

//Admin-Edit  : GET
AdminRoute.get("/edit-admin-page/:id", Auth, getEditAdminPage);  //✅

//Update-Admin : POST 
AdminRoute.post("/update-admin/:id", Authenticate, UpdateAdmin) //✅

//Export CSV File
AdminRoute.post("/export-csv", Authenticate, exportCSV)
//Export PDF File
AdminRoute.post("/export-pdf", Authenticate, exportPdf)
//Import JSON File
AdminRoute.post("/import-json", Authenticate, importJSON)

export default AdminRoute;
