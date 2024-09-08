import express from "express";
import { Auth } from "../middleware/Auth.js";
import {
  Add_Subcategory,
  add_subCategory_page,
  deleteSunCategory,
  edit_SubCategory,
  generatePDf,
  generatesExcel,
  getAllSubCategories,
  importDataJSON,
  manage_subCategory_page,
  update_subCategory,
} from "../controllers/subcategoriesController.js";
import Authenticate from "../middleware/Authenticate.js";
import isEmptyBody from "../middleware/isEmptyBody.js";
import upload from "../middleware/multer.js";

const SubCategoryRoute = express.Router();

//GET ADD SUB CATEGORY PAGE 🎯
SubCategoryRoute.get("/add-subcategory-page", Auth, add_subCategory_page);

//GET SUBCATEGORY MANAGE PAGE 🎯
SubCategoryRoute.get("/manage-subcategory", Auth, manage_subCategory_page);

//POST ADD SUB CATEGORY 🎯
SubCategoryRoute.post(
  "/add-subcategory",
  isEmptyBody,
  Authenticate,
  Add_Subcategory
);

//GET ALL SUB CATEGORIES 🎯
SubCategoryRoute.get(
  "/get-all-subcategories",
  Authenticate,
  getAllSubCategories
);

//DEKETE SUB CATEGORIES ROUTE🎯
SubCategoryRoute.delete(
  "/delete-subcategory/:id",
  Authenticate,
  deleteSunCategory
);

// EDIT SUB CATEGORIES ROUTE🎯
SubCategoryRoute.get("/edit-subcategory/:id", Auth, edit_SubCategory);

//UPDATE SUB CATEGORIES ROUTE🎯
SubCategoryRoute.put("/update-subcategory", Authenticate, update_subCategory);

//GENERATES EXCEL FILE SUB CATEGORIES ROUTE🎯
SubCategoryRoute.post("/generate-excel", Authenticate, generatesExcel);

//GENERATES PDF FILE SUB CATEGORIES ROUTE🎯
SubCategoryRoute.post("/generate-pdf", generatePDf);

//IMPORT JSON FILE AND STORE ROUTE 🎯
SubCategoryRoute.post("/import-data", upload.single("file"), importDataJSON);

export default SubCategoryRoute;
