import UserModel from "../models/UserModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";
import bcerytp from "bcryptjs";
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

//Upload Profile When add new User
//POST

export const NewUploadProfile = async (req, res) => {
  try {
    const file = await getDataUri(req.file);

    // delete preview image
    // await cloudinary.v2.uploader.destroy(user.profilePic.public_id);

    //update
    const cdb = await cloudinary.v2.uploader.upload(file.content);

    res.status(200).send({
      success: true,
      message: "The Profile Uploded Succefully",
      data: {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//Delete Profile : Uploded at Temp
export const deleteProfile = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).send({
        success: false,
        message: "Public_id is required",
      });
    }
    // delete preview image
    await cloudinary.v2.uploader.destroy(public_id, (error, result) => {
      if (error) {
        res.status(400).send({
          success: true,
          message: error,
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Deleted Succefully",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//get all admin
export const allAdmin = async (req, res) => {
  try {
    const start = parseInt(req.query.start, 10) || 0;
    const length = parseInt(req.query.length, 10) || 10;
    const search = req.query.search ? req.query.search.value : "";

    const data = await UserModel.find({});

    var filteredData = data;
    // Filter data based on search
    if (search) {
      filteredData = data.filter((item) =>
        item.firstname.toLowerCase().includes(search.toLowerCase())
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
  }
};

//delete admin  API
export const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    //validation
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "ID is required",
      });
    }

    //delete profile
    const Admin = await UserModel.findById(id);
    const public_id = Admin.profilePic[0].public_id;
    await cloudinary.v2.uploader.destroy(public_id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    //delete admin 🔥
    const delete_Admin = await UserModel.findByIdAndDelete(id);
    if (delete_Admin) {
      return res.status(200).send({
        success: true,
        message: "The Admin Deleted Succefully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//Edit Admin
export const EditAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.render("backend/admin/manage-admin");
    }

    const User = await UserModel.findById(id);
    console.log(User);

    res.render("backend/admin/edit-admin", { data: User });
  } catch (error) {
    console.log(error);
  }
};
