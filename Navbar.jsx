import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaUserCircle,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaHome,
  FaShoppingBag,
  FaTools,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaEllipsisH,
  FaMoon,
  FaSun,
} from "react-icons/fa";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const NavLink = ({ to, children, isActive = false, onClick, className = "" }) => (
    <a 
      href={to} 
      onClick={onClick} 
      className={className}
    >
      {children}
    </a>
  );

  return (
    <>
    <nav className="fixed w-full z-50 transition-all duration-500 bg-blue-500 via-blue-800 to-blue-900 backdrop-blur-lg shadow-lg border-b border-white/20">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-25 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 shadow-lg border">
            <span className="text-xl font-bold text-white">SabHai</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            BlueNav
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-white hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 font-medium"
          >
            <FaHome className="text-lg" /> Home
          </NavLink>

          <NavLink
            to="/products"
            className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-white hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 font-medium"
          >
            <FaShoppingBag className="text-lg" /> Products
          </NavLink>

          <NavLink
            to="/services"
            className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-white hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 font-medium"
          >
            <FaTools className="text-lg" /> Services
          </NavLink>

          <NavLink
            to="/pricing"
            className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-white hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 font-medium"
          >
            <FaMoneyBillWave className="text-lg" /> Pricing
          </NavLink>

          <NavLink
            to="/contact"
            className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-white hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 font-medium"
          >
            <FaPhoneAlt className="text-lg" /> Contact
          </NavLink>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-white hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md hover:scale-105 font-medium"
            >
              <FaEllipsisH /> More 
              <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl border border-white/20 overflow-hidden">
                <NavLink
                  to="/about"
                  className="block px-4 py-3 text-blue-700 hover:bg-blue-50/70 transition-all duration-200 font-medium"
                  onClick={() => setDropdownOpen(false)}
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/help"
                  className="block px-4 py-3 text-blue-700 hover:bg-blue-50/70 transition-all duration-200 font-medium border-t border-blue-100/50"
                  onClick={() => setDropdownOpen(false)}
                >
                  Help & Support
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <NavLink 
            to="/profile" 
            className="text-white hover:text-blue-200 transition-all duration-300 hover:scale-110"
          >
            <FaUserCircle className="text-2xl" />
          </NavLink>
          
          <NavLink to="/cart" className="relative group">
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
              3
            </div>
            <FaShoppingCart className="text-2xl text-white group-hover:text-blue-200 transition-all duration-300 group-hover:scale-110" />
          </NavLink>
          
{/*           <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="text-white hover:text-blue-200 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/30"
          >
            {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button> */}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
          >
            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-500/95 to-blue-700/95 backdrop-blur-lg border-t border-white/20 px-6 py-4 space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-white hover:bg-white/30 transition-all duration-300 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaHome /> Home
          </NavLink>
          <NavLink
            to="/products"
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-white hover:bg-white/30 transition-all duration-300 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaShoppingBag /> Products
          </NavLink>
          <NavLink
            to="/services"
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-white hover:bg-white/30 transition-all duration-300 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaTools /> Services
          </NavLink>
          <NavLink
            to="/pricing"
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-white hover:bg-white/30 transition-all duration-300 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaMoneyBillWave /> Pricing
          </NavLink>
          <NavLink
            to="/contact"
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-white hover:bg-white/30 transition-all duration-300 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaPhoneAlt /> Contact
          </NavLink>
        </div>
      )}
          
    </nav>
    
    {/* Demo Content */}
    <div className="pt-25">
        {/* <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
              Welcome to BlueNav
            </h1>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto leading-relaxed">
              Experience our beautiful light blue gradient navigation with smooth animations and modern design elements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">{item}</span>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">Feature {item}</h3>
                <p className="text-blue-600">
                  This is a sample card demonstrating the beautiful light blue theme with glassmorphism effects.
                </p>
              </div>
            ))}
          </div>
        </div> */}
    </div>
    </>
  );
};

export default Navbar;