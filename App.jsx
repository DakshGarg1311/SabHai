import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './components/Login';
// import SignUpPage from './components/SignUp';
import ProductDetail from './pages/ProductDetails';
import InsertProduct from './pages/InsertProduct';
// import About from './components/About';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} /> 
         <Route path="/products" element={<Products />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />*/}
        <Route path="/products/:id" element={<ProductDetail />} />
         <Route path="/insertproduct" element={<InsertProduct />} />
        {/*<Route path="/about" element={<About />} /> */} 
      </Routes>
    </>
  );
}

export default App;