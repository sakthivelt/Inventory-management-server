const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { upload } = require("../../utils/fileUpload");
const { Product, validateProduct } = require("../../DB/products");
const { adminAuth } = require("../../middleware/auth");

// get all product
router.get("/", async (req, res) => {
  try {
    const data = await Product.find({}).select({ user: 0 });

    // console.log(data);

    if (!data) return res.status(200).send({ data: [] });

    return res.status(200).send({ data: data });
  } catch (error) {
    return res.status(400).send({ error: "server error" });
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params.id });

    if (!data) return res.status(400).send({ error: "product not found" });

    return res.status(200).send({ data: data });
  } catch (error) {
    return res.status(400).send({ error: "server error" });
  }
});

// Create Product
router.post("/", upload.single("image"), async (req, res) => {
  const {
    _id: user,
    productName,
    category,
    quantity,
    price,
    description,
  } = req.body;
  const { error } = validateProduct({
    user,
    productName,
    category,
    quantity,
    price,
    description,
  });

  if (error) return res.status(400).send({ error: error.message });

  try {
    let product = new Product({
      user,
      productName,
      category,
      quantity,
      price,
      description,
    });

    product = await product.save();

    if (!product) return res.status(400).send({ error: "db error try  again" });

    return res.status(200).send({ data: product });
  } catch (error) {
    return res.status(400).send({ error: "server error" });
  }
});

// Update Product
router.patch("/:id", upload.single("image"), async (req, res) => {
  const {
    _id: user,
    productName,
    category,
    quantity,
    price,
    description,
  } = req.body;
  const { error } = validateProduct({
    user,
    productName,
    category,
    quantity,
    price,
    description,
  });
  if (error) return res.status(400).json({ error: error.message });

  try {
    let data = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { user, productName, category, quantity, price, description } },
      { new: true }
    ).select({ user: 0 });

    if (!data) return res.status(400).json({ error: "product not found" });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(404).send({ error: "server error" });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const data = await Product.findOneAndDelete({ _id: req.params.id });
    if (!data) return res.status(400).send({ error: "bad request" });
    return res.status(200).send({ data: "deleted" });
  } catch (error) {
    res.status(400).send({ error: "server error" });
  }
});

module.exports = router;
