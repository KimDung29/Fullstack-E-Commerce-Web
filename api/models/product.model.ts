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
    },
    desc: {
      type: String,
      required: true,
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
      required: true,
    },
    brand: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    price: {
      type: Number,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
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
