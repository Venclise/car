import mongoose, { models, Schema } from "mongoose";



const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    cutprice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export const Product =
  models.Product || mongoose.model("Product", ProductSchema);
