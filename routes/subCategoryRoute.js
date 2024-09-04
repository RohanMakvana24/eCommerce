import express from 'express'
import { Auth } from '../middleware/Auth.js';
import { add_subCategory_page, manage_subCategory_page } from '../controllers/subcategoriesController.js';

const SubCategoryRoute = express.Router();

//GET ADD SUB CATEGORY PAGE
SubCategoryRoute.get("/add-subcategory-page" , Auth , add_subCategory_page);

//GET SUBCATEGORY MANAGE PAGE
SubCategoryRoute.get("/manage-subcategory" , Auth , manage_subCategory_page)

export default SubCategoryRoute;
