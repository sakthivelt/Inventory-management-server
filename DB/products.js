const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productName: {
      type: String,
      required: [true, "Please add a productName"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  // console.log("validate product ==>", product);
  const scheme = Joi.object({
    user: Joi.string().required(),
    productName: Joi.string().min(5).max(50).required(),
    category: Joi.string().min(5).max(255).required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().min(5).required(),
    // image: Joi.object().required(),
  });
  return scheme.validate(product);
}

module.exports.Product = Product;
module.exports.validateProduct = validateProduct;
