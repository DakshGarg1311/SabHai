import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { formatIndianNumber } from "../utils/formatters";

export default function InsertProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBarcode, setProductBarcode] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState(""); // Dropdown
  const [productSKU, setProductSKU] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = ["Electronics", "Clothing", "Books", "Beauty", "Home Appliances"]; // Example categories

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setProductPrice(formatIndianNumber(Number(rawValue)));
  };

  const handleBarcodeChange = (e) => {
    setProductBarcode(e.target.value.slice(0, 12));
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const priceToSend = Number(productPrice.replace(/[^0-9]/g, ""));

    if (!productName || !priceToSend || !productBarcode || !productDescription || !productImage || !productCategory || !productSKU) {
      setError("*Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const productData = {
        ProductName: productName,
        ProductPrice: priceToSend,
        ProductBarcode: Number(productBarcode),
        ProductDescription: productDescription,
        ProductImage: productImage,
        ProductCategory: productCategory,
        ProductSKU: productSKU,
      };

      const res = await fetch("http://localhost:3001/insertproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      await res.json();

      if (res.status === 201) {
        alert("Product inserted successfully!");
        setProductName("");
        setProductPrice("");
        setProductBarcode("");
        setProductDescription("");
        setProductImage("");
        setProductCategory("");
        setProductSKU("");
        navigate("/products");
      } else if (res.status === 422) {
        setError("Product with this barcode already exists.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Enter Product Information
        </h1>
        <form onSubmit={addProduct} className="space-y-4">

          {/* Product Name */}
          <div>
            <label className="block text-lg font-semibold mb-2">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter Product Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg"
              required
              autoComplete="off"
            />
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-lg font-semibold mb-2">Product Price</label>
            <input
              type="text"
              value={productPrice}
              onChange={handlePriceChange}
              placeholder="Enter Product Price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg"
              required
            />
          </div>

          {/* Product Barcode */}
          <div>
            <label className="block text-lg font-semibold mb-2">Product Barcode</label>
            <input
              type="number"
              value={productBarcode}
              onChange={handleBarcodeChange}
              placeholder="Enter Product Barcode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg"
              required
              maxLength={12}
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-lg font-semibold mb-2">Product Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter Product Description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg resize-none"
              required
            ></textarea>
          </div>

          {/* Product Image URL */}
          <div>
            <label className="block text-lg font-semibold mb-2">Product Image URL</label>
            <input
              type="text"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              placeholder="Enter Image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg"
              required
            />
          </div>

          {/* Product Category Dropdown */}
          <div>
            <label className="block text-lg font-semibold mb-2">Product Category</label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Product SKU */}
          <div>
            <label className="block text-lg font-semibold mb-2">Product SKU</label>
            <input
              type="text"
              value={productSKU}
              onChange={(e) => setProductSKU(e.target.value)}
              placeholder="Enter Product SKU"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <NavLink
              to="/products"
              className="px-6 py-3 text-lg font-semibold rounded-lg bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </NavLink>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {loading ? "Inserting..." : "Insert Product"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="text-center text-red-600 font-semibold mt-4 text-lg">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
}
