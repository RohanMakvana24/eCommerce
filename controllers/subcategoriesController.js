import SubCategoryModel from "../models/subcategoriesModel.js";

//@ Accesss : Private
//@ Desc : get add Sub Category Page
//@ Route : api/v1/subcategoryhandle/add-subcategory-page

export const add_subCategory_page = async (req, res) => {
  try {
    res.render("backend/sub-category/add_subcategory");
  } catch (error) {
    console.log(error);
  }
};

//------------------ End Add Sub Category Section 🐱‍🏍--------------------//

//@ Accesss : Private
//@ Desc : get  Sub Category Manage  Page
//@ Route : api/v1/subcategoryhandle/subcategory-manage-page

export const manage_subCategory_page = async (req, res) => {
  try {
    res.render("backend/sub-category/managesubCategory");
  } catch (error) {
    console.log(error);
  }
};

//------------------ End Manage Sub Category Page Section 🐱‍🏍--------------------//

//@ Accesss : Private
//@ Desc : POST : Add SunCategory
//@ Route : api/v1/subcategoryhandle/add-subcategory
export const Add_Subcategory = async (req, res) => {
  try {
    const { name, categoryId, status, description } = req.body;

    const cat = categoryId ? categoryId : null;
    //Validation
    if (!name || !status || !description) {
      return res.status(404).send({
        success: false,
        message: "All Fields is required",
      });
    }

    const subCategory = await SubCategoryModel.findOne({ name: name });
    if (subCategory) {
      return res.status(400).send({
        success: false,
        message: "Sub Categories Name already exist try another",
      });
    }
    //Store
    const SubCategory = await SubCategoryModel.create({
      name: name,
      categoryId: cat,
      description: description,
      isActive: status,
      meta: {
        createdBy: req.user._id,
      },
    });

    res.status(200).send({
      success: true,
      message: "Added Sub Category Succefully",
      SubCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};
