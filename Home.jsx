import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        setProducts(data);
      } else {
        setError("Failed to fetch products.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-medium">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-lg font-bold text-red-600">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center mt-10 text-lg">
        No products available.
        <NavLink
          to="/insertproduct"
          className="block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-48 mx-auto transition"
        >
          Add a Product
        </NavLink>
      </div>
    );
  }

  return (
    <div className="w-full py-10 px-5">
      <h1 className="text-center mb-10 text-4xl font-extrabold tracking-wide">Our Products</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
            className="bg-white rounded-2xl shadow-lg w-80 cursor-pointer transform transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <img
              src={product.ProductImage}
              alt={product.ProductName}
              className="w-full h-56 object-cover rounded-t-2xl p-3"
            />
            <div className="p-5 flex flex-col justify-between h-56">
              <div>
                <h5 className="text-lg font-bold text-blue-600 mb-2">{product.ProductName}</h5>
                <p className="text-gray-600 line-clamp-2 mb-3">{product.ProductDescription}</p>
                <p className="text-green-600 font-semibold text-lg">₹{product.ProductPrice}</p>
              </div>
              <button
                className="mt-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-full py-2 rounded-lg transition"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/products/${product._id}`);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
