import express from "express";
import { Dashboard } from "../controllers/DashboardController.js";
import { Auth } from "../middleware/Auth.js";
const DashboardRoute = express.Router();

DashboardRoute.get("/", Auth, Dashboard);

export default DashboardRoute;
