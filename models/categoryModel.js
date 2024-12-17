import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the Category Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  parent_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
  },
  isActive: {
    type: Number,
    enum: [1, 0],
    default: 1,
  },
  meta: {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
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
categorySchema.pre("save", function (next) {
  if (this.isModified("name") || this.isModified("description")) {
    this.meta.updatedAt = Date.now();
  }
  next();
});

// Define and export the Category model
const CategoryModel = new mongoose.model("Category", categorySchema);

export default CategoryModel;
