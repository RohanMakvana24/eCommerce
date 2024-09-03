import express from "express";
import { Auth } from "../middleware/Auth.js";
import {
  add_categories_page,
  addCategories,
  deleteCategory,
  edit_Category,
  get_all_Categories,
  getCategories,
  manage_categories,
  updayte_category,
} from "../controllers/CategoriesController.js";
import Authenticate from "../middleware/Authenticate.js";
import isEmptyBody from "../middleware/isEmptyBody.js";
import ValidateBody from "../decorates/validateBody.js";
import categoryValid from "../utils/Validation-Schema/categoriesValidation/CategoriesValid.js";

const CategoriesRoute = express.Router();

//Get Add Categories Page 💨
CategoriesRoute.get("/add-categorsies-page", Auth, add_categories_page);

//Manage Categories Page 💨
CategoriesRoute.get("/manage-category", Auth, manage_categories);

//Get All Categorie For Parent Select 💨
CategoriesRoute.get("/get-category", Authenticate, getCategories);

//Get All Categories 💨
CategoriesRoute.post("/add-category", isEmptyBody, Authenticate, addCategories);

//Get All Categories With Functionality💨
CategoriesRoute.get("/get-all-categories", Authenticate, get_all_Categories);

//Delete Category
CategoriesRoute.delete("/delete-category/:id", Authenticate, deleteCategory);

//Edit Category
CategoriesRoute.get("/edit-category/:id", Auth, edit_Category);

//UPDATE CATEGORY
CategoriesRoute.put("/update-category", Authenticate, updayte_category);
export default CategoriesRoute;
