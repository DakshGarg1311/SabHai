const express = require('express');
const router = express.Router();
const Products = require('../Models/Products');

/* ===========================
   🔹 INSERT PRODUCT(S)
=========================== */
router.post("/insertproduct", async (req, res) => {
  try {
    // Accept single object OR array of objects
    const productsArray = Array.isArray(req.body) ? req.body : [req.body];

    // Validate each product
    for (let p of productsArray) {
      if (!p.ProductName || !p.ProductPrice || !p.ProductBarcode || !p.ProductDescription || !p.ProductImage || !p.ProductCategory || !p.ProductSKU) {
        return res.status(400).json({ error: "Please fill in all the required fields." });
      }

      const pre = await Products.findOne({ ProductBarcode: p.ProductBarcode });
      if (pre) {
        return res.status(422).json({ error: `Product with barcode ${p.ProductBarcode} is already added.` });
      }
    }

    // Insert all products at once
    const addedProducts = await Products.insertMany(productsArray);
    res.status(201).json({ message: "Products inserted successfully", data: addedProducts });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while inserting product(s)" });
  }
});

/* ===========================
   🔹 GET ALL PRODUCTS
=========================== */
router.get('/products', async (req, res) => {
  try {
    const getProducts = await Products.find({});
    res.status(200).json(getProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching products" });
  }
});

/* ===========================
   🔹 UPDATE PRODUCT
=========================== */
router.put('/updateproduct/:id', async (req, res) => {
  const { ProductName, ProductPrice, ProductBarcode, ProductDescription, ProductImage, ProductCategory, ProductSKU } = req.body;
  try {
    const updateProducts = await Products.findByIdAndUpdate(
      req.params.id,
      { ProductName, ProductPrice, ProductBarcode, ProductDescription, ProductImage, ProductCategory, ProductSKU },
      { new: true }
    );
    if (!updateProducts) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(updateProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while updating product" });
  }
});

/* ===========================
   🔹 DELETE PRODUCT
=========================== */
router.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deleteProduct) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(deleteProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while deleting product" });
  }
});

/* ===========================
   🔹 GET SINGLE PRODUCT
=========================== */
router.get('/products/:id', async (req, res) => {
  try {
    const getProduct = await Products.findById(req.params.id);
    if (!getProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(getProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching product." });
  }
});

module.exports = router;
