import UserModel from "../models/UserModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";
import { stringify } from 'csv-stringify/sync'
import path, { resolve } from 'path';
import fs from 'fs'
import pdf from 'html-pdf'
import AppRootPath from 'app-root-path'
import ejs from 'ejs'
// Get the current directory using import.meta.url
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// ▁▂▄▅▆▇█ Type : GET || Desc : Get Add Admin Page  █▇▆▅▄▂▁
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
// ---------------- ❝ Add Admin Page Get Section End ❞ ----------------- //

// ▁▂▄▅▆▇█ Type : GET || Desc : Get Manage Admin Page  █▇▆▅▄▂▁  //
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
// ---------------- ❝ Manage Admin Page Get Section End ❞ ----------------- //


// ▁▂▄▅▆▇█ Type : POST || Desc : Upload New User Profile  █▇▆▅▄▂▁  //
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
// ---------------- ❝ Upload New User Profile Section End ❞ ----------------- //


// ▁▂▄▅▆▇█ Type : POST || Desc : Temp Uploaded Profile Delete  █▇▆▅▄▂▁  //
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
// ---------------- ❝ Temp Uploaded Profile Section End ❞ ----------------- //


// ▁▂▄▅▆▇█ Type : GET || Desc : Get All Admins  █▇▆▅▄▂▁  //
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
    res.status(504).send({
      success: false,
      message: "Somenthing Went Wrong"
    })
  }
};
// ---------------- ❝ Get All Admins  Section End ❞ ----------------- //

// ▁▂▄▅▆▇█ Type : DELETE || Desc : Delete Admin   █▇▆▅▄▂▁  //
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
// ---------------- ❝ Delete Admin Section End ❞ ----------------- //


// ▁▂▄▅▆▇█ Type : GET || Desc : Preview Admin Page  █▇▆▅▄▂▁  //
export const getPreviewPageAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const FindAdmin = await UserModel.findById(id);

    res.render("backend/admin/preview-admin", { admin: FindAdmin });
  } catch (error) {
    console.log(error)
  }
}
// ---------------- ❝ Preview Admin Page Section End ❞ ----------------- //


// ▁▂▄▅▆▇█ Type : GET || Desc : Edit Admin Page  █▇▆▅▄▂▁  //
export const getEditAdminPage = async (req, res) => {
  try {
    const id = req.params.id;
    const FindAdmin = await UserModel.findById(id);
    res.render("backend/admin/edit-admin", { admin: FindAdmin })
  } catch (error) {
    console.log(error)
  }
}
// ---------------- ❝ Edit Admin Page Section End ❞ ----------------- //

// ▁▂▄▅▆▇█ Type : POST || Desc : Update Admin  █▇▆▅▄▂▁  //
export const UpdateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstname, lastname, email, public_id, url } = req.body;

    const adminDetails = {
      firstname,
      lastname,
      email,
      profilePic: {
        public_id,
        url
      }
    }
    //validation
    if (!firstname || !lastname || !email || !public_id || !url) {
      return res.status(404).send({
        success: true,
        message: "All Field are required"
      })
    }

    const User = await UserModel.findOne({ email: email });
    if (User) {
      delete adminDetails.email
    }

    const UpdateAdmin = await UserModel.findByIdAndUpdate(id, adminDetails, { new: true })
    if (UpdateAdmin) {
      return res.status(200).send({
        success: true,
        message: "The Admin Updated Succefullly"
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(504).send({
      success: false,
      message: error.message
    })
  }
}
// ---------------- ❝ Update Admin Section End ❞ ----------------- //


// ▁▂▄▅▆▇█ Type : POST || Desc : Export Data In CSV File  █▇▆▅▄▂▁  //
export const exportCSV = (req, res) => {
  try {
    let column = {
      _id: "_id",
      firstname: "firstname",
      lastname: "lastname",
      email: "email",
      role: "role",
      profilePic: "profilePic"
    }
    // Logic to get user records excluding password
    const UserData = Object.values(req.body).map(({ password, profilePic, ...rest }) => ({
      ...rest,
      profilePic: profilePic[0]?.url
    }));


    const output = stringify(UserData, { header: true, columns: column })
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=my.csv');
    res.send(output);

  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "CSV File Generates Error"
    })
  }
}
// ---------------- ❝ Export Data In CSV File Section End ❞ ----------------- //

// ▁▂▄▅▆▇█ Type : POST || Desc : Export Data In PDF File  █▇▆▅▄▂▁  //
export const exportPdf = async (req, res) => {
  try {
    // Prepare the data by excluding unwanted fields
    const UserData = Object.values(req.body).map(({ password, Token, profilePic, ...rest }) => ({
      ...rest,
      profilePic: profilePic[0]?.url // Assuming profilePic is an array
    }));

    // Resolve the file path properly using AppRootPath
    const filePathName = path.join(AppRootPath.path, 'views', 'backend', 'admin', 'pdf.ejs');

    // Read the EJS file content
    const htmlTemplate = fs.readFileSync(filePathName, 'utf-8');

    // Render the EJS template to an HTML string with the UserData
    const htmlString = ejs.render(htmlTemplate, { UserData });

    // PDF generation options
    const options = {
      format: 'Letter',
      timeout: 30000
    };

    // Generate the PDF and send it directly to the response
    pdf.create(htmlString, options).toBuffer((err, buffer) => {
      if (err) {
        console.error('Error generating PDF:', err);
        return res.status(500).send({
          success: false,
          message: 'Error generating PDF'
        });
      }

      // Set response headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');
      res.send(buffer); // Send the PDF buffer directly
    });
  } catch (error) {
    console.log('Error in exportPdf:', error);
    res.status(500).send({
      success: false,
      message: "PDF Generating Error"
    });
  }
};
// ---------------- ❝ Export Data In PDF File Section End ❞ ----------------- //


// ▁▂▄▅▆▇█ Type : POST || Desc : Import JSON Data  █▇▆▅▄▂▁  //
export const importJSON = async (req, res) => {
  try {
    const data = req.body
    if (!data) {
      return res.status(400).send({
        success: false,
        message: "The Data is required"
      })
    }

    if (Array.isArray(data) && data.length > 0) {
      const result = await UserModel.insertMany(data);
      return res.status(200).send({
        success: true,
        data: result,
        message: "The Data inserted Succefully"
      })
    } else {
      return res.status(200).send({
        success: false,
        data: result,
        message: "The Data inserted Succefully"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Somenthing Went Wrong"
    })
  }
}