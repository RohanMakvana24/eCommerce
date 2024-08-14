import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";

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
