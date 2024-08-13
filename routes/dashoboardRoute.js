import express from "express";
import { Dashboard, ProfilePage } from "../controllers/DashboardController.js";
import { Auth } from "../middleware/Auth.js";
const DashboardRoute = express.Router();

DashboardRoute.get("/", Auth, Dashboard);
DashboardRoute.get("/profile",Auth, ProfilePage);

export default DashboardRoute;
