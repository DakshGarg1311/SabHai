import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

// Mock formatIndianNumber function
const formatIndianNumber = (num) => {
  return new Intl.NumberFormat("en-IN").format(num);
};

export default function Products() {
  const [productData, setProductData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ProductName: "",
    ProductPrice: "",
    ProductBarcode: "",
    ProductDescription: "",
    ProductImage: "",
    ProductCategory: "",
    ProductSKU: "",
  });

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/products");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setProductData(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
          method: "DELETE",
        });
        if (response.ok) getProducts();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const startEditing = (product) => {
    const formattedPrice = formatIndianNumber(product.ProductPrice);
    setEditingId(product._id);
    setFormData({
      ProductName: product.ProductName,
      ProductPrice: formattedPrice,
      ProductBarcode: product.ProductBarcode,
      ProductDescription: product.ProductDescription,
      ProductImage: product.ProductImage,
      ProductCategory: product.ProductCategory,
      ProductSKU: product.ProductSKU,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({
      ProductName: "",
      ProductPrice: "",
      ProductBarcode: "",
      ProductDescription: "",
      ProductImage: "",
      ProductCategory: "",
      ProductSKU: "",
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "ProductPrice") {
      const rawValue = e.target.value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [e.target.name]: formatIndianNumber(Number(rawValue)) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const updateProduct = async (id) => {
    const priceToSend = Number(formData.ProductPrice.replace(/[^0-9]/g, ""));
    try {
      const response = await fetch(`http://localhost:3001/updateproduct/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ProductName: formData.ProductName,
          ProductPrice: priceToSend,
          ProductBarcode: formData.ProductBarcode,
          ProductDescription: formData.ProductDescription,
          ProductImage: formData.ProductImage,
          ProductCategory: formData.ProductCategory,
          ProductSKU: formData.ProductSKU,
        }),
      });
      if (response.ok) {
        setEditingId(null);
        getProducts();
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Product Inventory Management</h1>
          <a
            href="/insertproduct"
            className="inline-flex items-center gap-2 px-4 py-2 md:px-4 md:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 text-sm md:text-base font-medium"
          >
            <Plus size={18} /> Add New Product
          </a>
        </header>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                <tr>
                  {["#", "Image", "Name", "Description", "Price", "Barcode", "Category", "SKU", "Actions"].map((th, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {productData.length > 0 ? (
                  productData.map((el, index) => (
                    <tr key={el._id} className="hover:bg-slate-50 transition-colors duration-200">
                      <td className="px-4 py-2 text-sm font-medium text-slate-900 whitespace-nowrap">{index + 1}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <img src={el.ProductImage} alt={el.ProductName} className="w-12 h-12 rounded-lg object-cover shadow-sm border border-slate-200" />
                      </td>
                      <td className="px-4 py-2">
                        {editingId === el._id ? (
                          <input
                            type="text"
                            name="ProductName"
                            value={formData.ProductName}
                            onChange={handleChange}
                            className="min-w-0 w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none"
                          />
                        ) : (
                          <span className="font-medium text-slate-900">{el.ProductName}</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingId === el._id ? (
                          <textarea
                            name="ProductDescription"
                            value={formData.ProductDescription}
                            onChange={handleChange}
                            rows={2}
                            className="min-w-0 w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none resize-none"
                          />
                        ) : (
                          <span className="text-gray-700 text-sm">{el.ProductDescription}</span>
                        )}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        {editingId === el._id ? (
                          <input
                            type="text"
                            name="ProductPrice"
                            value={formData.ProductPrice}
                            onChange={handleChange}
                            className="min-w-0 w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-emerald-600">₹ {formatIndianNumber(el.ProductPrice)}</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingId === el._id ? (
                          <input
                            type="text"
                            name="ProductBarcode"
                            value={formData.ProductBarcode}
                            onChange={handleChange}
                            className="min-w-0 w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none"
                          />
                        ) : (
                          <span className="text-sm font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">{el.ProductBarcode}</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingId === el._id ? (
                          <input
                            type="text"
                            name="ProductCategory"
                            value={formData.ProductCategory}
                            onChange={handleChange}
                            className="min-w-0 w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none"
                          />
                        ) : (
                          <span className="text-sm text-slate-700">{el.ProductCategory}</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingId === el._id ? (
                          <input
                            type="text"
                            name="ProductSKU"
                            value={formData.ProductSKU}
                            onChange={handleChange}
                            className="min-w-0 w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none"
                          />
                        ) : (
                          <span className="text-sm font-mono text-slate-600">{el.ProductSKU}</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center whitespace-nowrap">
                        {editingId === el._id ? (
                          <div className="flex justify-center gap-2 flex-wrap">
                            <button
                              onClick={() => updateProduct(el._id)}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition"
                            >
                              <Save size={14} /> Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-slate-600 text-white text-sm font-medium rounded-md hover:bg-slate-700 transition"
                            >
                              <X size={14} /> Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center gap-2 flex-wrap">
                            <button onClick={() => startEditing(el)} title="Edit product" className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => deleteProduct(el._id)} title="Delete product" className="p-2 text-red-600 hover:bg-red-50 rounded-md transition">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <Plus size={24} className="text-slate-400" />
                        </div>
                        <p className="text-slate-600 text-lg font-medium mb-2">No products found</p>
                        <p className="text-slate-400 text-sm">Add a new product to get started!</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {productData.length > 0 ? (
            productData.map((el, index) => (
              <div key={el._id} className="bg-white shadow-md rounded-lg p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">{index + 1}. {el.ProductName}</span>
                  <div className="flex gap-2">
                    {editingId === el._id ? null : (
                      <>
                        <button onClick={() => startEditing(el)} title="Edit product" className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteProduct(el._id)} title="Delete product" className="p-1 text-red-600 hover:bg-red-50 rounded-md transition">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <img src={el.ProductImage} alt={el.ProductName} className="w-20 h-20 rounded-lg object-cover border border-slate-200" />
                  <div className="flex-1 min-w-0">
                    {editingId === el._id ? (
                      <>
                        <input
                          type="text"
                          name="ProductName"
                          value={formData.ProductName}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none mb-1"
                          placeholder="Product Name"
                        />
                        <textarea
                          name="ProductDescription"
                          value={formData.ProductDescription}
                          onChange={handleChange}
                          rows={2}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none resize-none mb-1"
                          placeholder="Description"
                        />
                        <input
                          type="text"
                          name="ProductPrice"
                          value={formData.ProductPrice}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none mb-1"
                          placeholder="Price"
                        />
                        <input
                          type="text"
                          name="ProductBarcode"
                          value={formData.ProductBarcode}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none mb-1"
                          placeholder="Barcode"
                        />
                        <input
                          type="text"
                          name="ProductCategory"
                          value={formData.ProductCategory}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none mb-1"
                          placeholder="Category"
                        />
                        <input
                          type="text"
                          name="ProductSKU"
                          value={formData.ProductSKU}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none mb-1"
                          placeholder="SKU"
                        />
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => updateProduct(el._id)}
                            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition"
                          >
                            <Save size={14} /> Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1 bg-slate-600 text-white text-sm font-medium rounded-md hover:bg-slate-700 transition"
                          >
                            <X size={14} /> Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 text-sm mb-1">{el.ProductDescription}</p>
                        <p className="text-emerald-600 font-semibold mb-1">₹ {formatIndianNumber(el.ProductPrice)}</p>
                        <p className="text-slate-600 text-sm mb-1">Barcode: {el.ProductBarcode}</p>
                        <p className="text-slate-700 text-sm mb-1">Category: {el.ProductCategory}</p>
                        <p className="text-slate-600 text-sm">SKU: {el.ProductSKU}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center py-12">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Plus size={24} className="text-slate-400" />
              </div>
              <p className="text-slate-600 text-lg font-medium mb-2">No products found</p>
              <p className="text-slate-400 text-sm">Add a new product to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
