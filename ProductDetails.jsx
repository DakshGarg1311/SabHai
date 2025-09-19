import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { formatIndianNumber } from "../utils/formatters";
import { FaArrowLeft, FaShoppingCart, FaBolt } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/products/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product with ID: ${id}`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-medium text-gray-700">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-lg font-bold text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-10 text-lg text-gray-700">Product not found.</div>;
  }

  return (
    <div className="w-full px-5 py-10">
      {/* Back button */}
      <NavLink
        to="/"
        className="inline-flex items-center gap-2 mb-6 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
      >
        <FaArrowLeft /> Back to Products
      </NavLink>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-4 w-full">
            <img
              src={product.ProductImage}
              alt={product.ProductName}
              className="w-full max-h-[500px] object-contain rounded-lg transform transition duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            {/* Product name */}
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              {product.ProductName}
            </h1>

            {/* Price Box (toned down) */}
            <div className="bg-gray-50 px-5 py-3 rounded-lg border border-gray-200 mb-6 inline-block">
              <span className="text-base text-gray-600">Price:</span>{" "}
              <span className="text-2xl font-bold text-green-700 ml-2">
                ₹ {formatIndianNumber(product.ProductPrice)}
              </span>
              <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <h3 className="text-xl font-semibold mt-6 text-gray-800">Product Description</h3>
            <p className="text-gray-700 text-base mt-2">{product.ProductDescription}</p>

            {/* Extra Info */}
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Additional Details</h4>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>
                  <span className="font-medium text-gray-800">Barcode:</span> {product.ProductBarcode}
                </li>
                <li>
                  <span className="font-medium text-gray-800">Category:</span> {product.ProductCategory || "N/A"}
                </li>
                <li>
                  <span className="font-medium text-gray-800">SKU:</span> {product.ProductSKU || "N/A"}
                </li>
              </ul>
            </div>
          </div>

          {/* Buttons (clean + improved) */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg shadow-md transition">
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-lg py-3 rounded-lg shadow-md transition">
              <FaBolt /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
