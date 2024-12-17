import CategoryModel from "../models/categoryModel.js";
import cloudinary from "cloudinary";
//@ Accesss : Private
//@ Desc : display add categories page
//@ Route : api/v1/categorieshandle/add-categories-page
export const add_categories_page = (req, res) => {
  try {
    res.render("backend/categories/add_categories");
  } catch (error) {
    console.log(error);
  }
};

// <---------------  End Add Categoris Page Section 💥  ------------------>

//@ Accesss : Private
//@ Desc : manage categories page
//@ Route : api/v1/categorieshandle/manage-category
export const manage_categories = (req, res) => {
  res.render("backend/categories/manage_categories");
};

// <---------------  End Manage Category Page Section 💥  ------------------>

//@ Accesss : Private
//@ Desc : Get All Categories
//@ Route : api/v1/categorieshandle/get-category
export const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

// <---------------  End Manage Category Page Section 💥  ------------------>

//@ Accesss : Private
//@ Desc : Add Categories
//@ Route : api/v1/categorieshandle/add-category
export const addCategories = async (req, res, next) => {
  try {
    const { name, status, public_id, description, url, pcategory } = req.body;
    const { _id } = req.user;
    //validation
    if (!name || !status || !public_id || !description || !url) {
      return res.status(400).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const CategoriesData = {
      name: name,
      description: description,
      isActive: status,
      parent_category: pcategory,
      image: {
        public_id: public_id,
        url: url,
      },
      meta: {
        createdBy: _id,
      },
    }

    if (!pcategory) {
      delete CategoriesData.parent_category
    }
    const category = await CategoryModel.create(CategoriesData);
    res.status(201).send({
      success: true,
      message: "The Category Added Succefully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

// <---------------  End Add Category Section 💥  ------------------>

//@ Accesss : Private
//@ Desc : Get All Categories With Functionality
//@ Route : api/v1/categorieshandle/get-all-categories
export const get_all_Categories = async (req, res) => {
  try {
    const start = parseInt(req.query.start, 10) || 0;
    const length = parseInt(req.query.length, 10) || 10;
    const search = req.query.search ? req.query.search.value : "";

    const data = await CategoryModel.find({});
    var filteredData = data;

    // Filter data based on search
    if (search) {
      filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Slice data for pagination
    const paginatedData = filteredData.slice(start, start + length);
    res.json({
      draw: parseInt(req.query.draw, 10) || 1,
      recordsTotal: data.length,
      recordsFiltered: filteredData.length,
      data: paginatedData,
    });
  } catch (error) {
    console.log(error);
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

// <---------------  End Get All Category Section 💥  ------------------>

//@ Accesss : Private
//@ Desc : Delete Categories
//@ Route : api/v1/categorieshandle/delete-category
export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    //validation
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Cateories id is required",
      });
    }

    const Category = await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "The Category Deleted Succefully",
    });
  } catch (error) {
    console.log(error);
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};
// <---------------  End Delete Category Section 💥  ------------------>

//@ Accesss : Private
//@ Desc : Edit Categories
//@ Route : api/v1/categorieshandle/edit-category
export const edit_Category = async (req, res) => {
  try {
    const id = req.params.id;

    //validation
    if (!id) {
      return res.status(400).send({
        success: false,
        message: `The Categories is not found with given id ${id}`,
      });
    }

    const Category = await CategoryModel.findById(id);
    res.render("backend/categories/update_categories", { data: Category });
  } catch (error) {
    console.log(error);
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

// <---------------  End Get Single Category Section 💥  ------------------>

//@ Accesss : Private
//@ Desc : Update Categories
//@ Route : api/v1/categorieshandle/update-category
export const updayte_category = async (req, res) => {
  try {
    const { name, status, public_id, url, description, catId } = req.body;
    //validations
    if (!name || !status || !description || !catId) {
      return res.status(400).send({
        success: false,
        message: "All Fields are required",
      });
    }

    if (!public_id || !url) {
      const Category = await CategoryModel.findByIdAndUpdate(catId, {
        name: name,
        isActive: status,
        description: description,
      });
      return res.status(201).send({
        success: true,
        message: "The Category Updated",
      });
    } else {
      const Category = await CategoryModel.findById(catId);
      const old_public_id = Category.image[0].public_id;

      // delete preview image
      await cloudinary.v2.uploader.destroy(old_public_id, (error, result) => {
        if (error) {
          res.status(400).send({
            success: true,
            message: error,
          });
        } else {
          console.log(result);
        }
      });
      await CategoryModel.findByIdAndUpdate(catId, {
        name: name,
        image: {
          public_id: public_id,
          url: url,
        },
        meta: {
          updatedBy: req.user._id,
        },
        isActive: status,
        description: description,
      });
      return res.status(201).send({
        success: true,
        message: "The Category Updated",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};
