import express from "express";
import { Auth } from "../middleware/Auth.js";
import {
  add_categories_page,
  manage_categories,
} from "../controllers/CategoriesController.js";

const CategoriesRoute = express.Router();

//Get Add Catefories Page 💨
CategoriesRoute.get("/add-categorsies-page", Auth, add_categories_page);

//Manage Catefories Page 💨
CategoriesRoute.get("/manage-category", Auth, manage_categories);

export default CategoriesRoute;
