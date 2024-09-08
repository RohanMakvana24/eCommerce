import SubCategoryModel from "../models/subcategoriesModel.js";
import ExcelJS from "exceljs";
import fs from "fs";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

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

//------------------ End Add Category Page Section 🐱‍🏍--------------------//

//@ Accesss : Private
//@ Desc : Get All Sub Categories With Functionality
//@ Route : api/v1/subcategoryhandle/get-all-subcategories
export const getAllSubCategories = async (req, res) => {
  try {
    const start = parseInt(req.query.start, 10) || 0;
    const length = parseInt(req.query.length, 10) || 10;
    const search = req.query.search ? req.query.search.value : "";

    const data = await SubCategoryModel.find({})
      .populate("categoryId", "name")
      .populate("meta.createdBy", "firstname lastname")
      .populate("meta.updatedBy", "firstname lastname");
    var filteredData = data;

    //Searching Functionality
    if (search) {
      filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Slice data for pagination
    const paginateData = filteredData.slice(start, start + length);
    res.json({
      draw: parseInt(req.query.draw, 10) || 1,
      recordsTotal: data.length,
      recordsFiltered: filteredData.length,
      data: paginateData,
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//------------------ End Get All Subcategory Category  Section 🐱‍🏍--------------------//

//@ Accesss : Private
//@ Desc : Delete Sub Categories
//@ Route : api/v1/subcategoryhandle/delete-subcategories
export const deleteSunCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const SubCategory = await SubCategoryModel.findById(id);
    if (!SubCategory) {
      return res.status(400).send({
        success: false,
        message: `Sub Category not Found with Id(${id})`,
      });
    }

    await SubCategoryModel.findByIdAndDelete(SubCategory._id);
    res.status(200).send({
      success: true,
      message: "The Sub Category is deleted Succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};
//------------------ End Get All Subcategory Category  Section 🐱‍🏍--------------------//

//@ Accesss : Private
//@ Desc : Edit Sub Categories
//@ Route : api/v1/subcategoryhandle/edit-subcategories
export const edit_SubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const SubCategory = await SubCategoryModel.findById(id).populate({
      path: "categoryId",
    });
    console.log(SubCategory);
    res.render("backend/sub-category/update-subCategory", {
      data: SubCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};
//------------------ End Edit Subcategory Section 🐱‍🏍--------------------//

//@ Accesss : Private
//@ Desc : Update Sub Categories
//@ Route : api/v1/subcategoryhandle/update-subcategories
export const update_subCategory = async (req, res) => {
  try {
    const { name, categoryId, status, subCatId, description } = req.body;

    //Validation
    if (!name || !categoryId || !status || !subCatId || !description) {
      res.status(400).send({
        success: false,
        message: "All Fields are required",
      });
    }

    //Sun Category Validation
    const SubCategory = await SubCategoryModel.findById(subCatId);
    if (!SubCategory) {
      return res.status(400).send({
        success: false,
        message: `Sub Category is not found with id(${subCatId})`,
      });
    }

    //Update Data
    await SubCategoryModel.findByIdAndUpdate(subCatId, {
      name: name,
      description: description,
      isActive: status,
      categoryId: categoryId,
      meta: {
        updatedBy: req.user._id,
      },
    });

    res.status(200).send({
      success: true,
      message: "Sub Category Updated Succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//------------------ End Update Subcategory Section 🐱‍🏍--------------------//

//@ Accesss : Private
//@ Desc : Excel Sub Categories Table
//@ Route : api/v1/subcategoryhandle/generate-excel
export const generatesExcel = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No Data Found",
      });
    }
    if (!Array.isArray(data)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid data format" });
    }
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sub Category");

    // Add header row
    if (data.length > 0) {
      worksheet.addRow(Object.keys(data[0]));
    }

    // Add data rows
    data.forEach((row) => worksheet.addRow(Object.values(row)));

    // Set response headers
    res.setHeader("Content-Disposition", "attachment; filename=export.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Write the Excel file to the response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//------------------ End Excel generates Subcategory Section 🐱‍🏍--------------------//

//@ Accesss : Private
//@ Desc : Import JSON file and store
//@ Route : api/v1/subcategoryhandle/import-data
export const importDataJSON = async (req, res) => {
  try {
    const file = req.file;

    //validation
    if (!file) {
      return res.status(400).send({
        success: false,
        message: "File Is Required",
      });
    }

    //file validation
    if (!file.mimetype.startsWith("application/json")) {
      return res.status(400).send({
        success: false,
        message: "Please Select JSON File",
      });
    }

    //ReadFile and Convert JSON
    const jsonData = JSON.parse(req.file.buffer.toString("utf8"));

    //Store
    await SubCategoryModel.insertMany(jsonData);

    //response
    res.status(201).send({
      success: true,
      message: "Succefully Added Data",
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: true,
      message: error.message,
    });
  }
};

//------------------ End Edit Subcategory Section 🐱‍🏍--------------------//

//@ Accesss : Private
//@ Desc : generates the pdf file
//@ Route : api/v1/subcategoryhandle/generate-pdf

export const generatePDf = async (req, res) => {
  try {
    const data = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    // Create a new PDF document
    const doc = new PDFDocument();
    const fileName = "subcategory.pdf";
    const filePath = join(__dirname, fileName);

    // Pipe PDF to a writable stream
    doc.pipe(fs.createWriteStream(filePath));

    // Add a title
    doc.fontSize(16).text("Subcategory Report", { align: "center" });
    doc.moveDown();

    // Define column widths
    const columns = {
      name: 100,
      status: 60,
      description: 150,
      category: 100,
      createdAt: 100,
      createdBy: 120,
      updatedAt: 100,
      updatedBy: 120,
    };

    // Draw table header
    doc.fontSize(12).text("Name", 50, 80);
    doc.text("Status", 150, 80);
    doc.text("Description", 210, 80);
    doc.text("Category", 370, 80);
    doc.text("Created At", 470, 80);
    doc.text("Created By", 570, 80);
    doc.text("Updated At", 690, 80);
    doc.text("Updated By", 790, 80);

    doc.moveDown();

    // Draw table rows
    let yPosition = 100;
    data.forEach((row) => {
      doc
        .fontSize(10)
        .text(row.name, 50, yPosition, { width: columns.name })
        .text(row.status, 150, yPosition, { width: columns.status })
        .text(row.description, 210, yPosition, { width: columns.description })
        .text(row.category, 370, yPosition, { width: columns.category })
        .text(row.createdAt, 470, yPosition, { width: columns.createdAt })
        .text(row.createdBy, 570, yPosition, { width: columns.createdBy })
        .text(row.updatedAt, 690, yPosition, { width: columns.updatedAt })
        .text(row.updatedBy, 790, yPosition, { width: columns.updatedBy });

      yPosition += 20; // Move to next line for the next row
    });

    doc.end();

    console.log(`PDF generated at ${filePath}`);
    // Serve file
    res.sendFile(filePath, { root: __dirname }, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error generating PDF");
      } else {
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
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
