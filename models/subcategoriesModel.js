import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

// Define the Category Schema
const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: false,
  },

  isActive: {
    type: Number,
    enum: [1, 0],
    default: 1,
  },
  meta: {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
});

// Add pre-save middleware to update `updatedAt` field
subcategorySchema.pre("save", function (next) {
  if (this.isModified("name") || this.isModified("description")) {
    this.meta.updatedAt = Date.now();
  }
  next();
});

// Define and export the Category model
const SubCategoryModel = new mongoose.model("SubCategory", subcategorySchema);

export default SubCategoryModel;
