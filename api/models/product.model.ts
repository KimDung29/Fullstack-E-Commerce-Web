import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
     userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: false,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    categories: {
      type: [String],
      required: false,
    },
    brand: {
        type: String,
        required: false
    },
    ingredients: {
      type: String,
      required: false,
    },
    howToUse: {
        type: String,
        required: false
    },
    price: {
      type: Number,
      required: false,
    },
    coverImg: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    features: {
      type: [String],
      required: false,
    },
    longDesc: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    inStock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);
