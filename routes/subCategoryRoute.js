import express from "express";
import { Auth } from "../middleware/Auth.js";
import {
  Add_Subcategory,
  add_subCategory_page,
  manage_subCategory_page,
} from "../controllers/subcategoriesController.js";
import Authenticate from "../middleware/Authenticate.js";
import isEmptyBody from "../middleware/isEmptyBody.js";

const SubCategoryRoute = express.Router();

//GET ADD SUB CATEGORY PAGE
SubCategoryRoute.get("/add-subcategory-page", Auth, add_subCategory_page);

//GET SUBCATEGORY MANAGE PAGE
SubCategoryRoute.get("/manage-subcategory", Auth, manage_subCategory_page);

//POST ADD SUB CATEGORY
SubCategoryRoute.post(
  "/add-subcategory",
  isEmptyBody,
  Authenticate,
  Add_Subcategory
);

export default SubCategoryRoute;
