import express from "express";
import {
  add_admin_page,
  manage_admin,
} from "../controllers/adminController.js";

const AdminRoute = express.Router();

//Admin-Page : GET
AdminRoute.get("/add-admin-page", add_admin_page);

//Admin-manage-page : GET
AdminRoute.get("/manage-admin-page", manage_admin);
export default AdminRoute;
