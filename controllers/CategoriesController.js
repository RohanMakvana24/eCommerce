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
