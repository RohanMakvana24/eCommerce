//ADD ADMIN PAGE
//GET
export const add_admin_page = (req, res) => {
  try {
    res.render("backend/admin/add-admin");
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//ADD ADMIN PAGE
//GET
export const manage_admin = (req, res) => {
  try {
    res.render("backend/admin/manage-admin");
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};
