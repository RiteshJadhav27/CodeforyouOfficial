import React, { useState } from "react";
import { FaRegHeart, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust as per your folder
import {
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function ProjectDetails() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = false; // adjust dynamically later

  const handleHireClick = () => {
    alert("Hire request initiated!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= Navbar ================= */}
      <header className="w-full bg-white shadow border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex flex-col items-center gap-0">
            <img src={logo} alt="CodeForYou logo" className="h-6 w-auto" />
            <span className="font-bold text-xl">&lt;CodeForYou/&gt;</span>
          </div>

          <button
            className="md:hidden flex items-center text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <nav
            className={`flex-col md:flex-row md:flex md:items-center md:gap-4 w-full md:w-auto ${
              mobileMenuOpen ? "flex" : "hidden"
            } md:flex`}
          >
            <Link
              to="/project"
              className="block md:inline text-gray-700 hover:text-black font-medium px-3 py-2"
            >
              Projects
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/signin"
                  className="block md:inline text-gray-700 hover:text-black font-medium px-3 py-2"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="block md:inline text-gray-700 hover:text-black font-medium px-3 py-2"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="relative md:inline-block"></div>
            )}
            <div className="relative ml-2">
              <button
                onClick={handleHireClick}
                className="bg-black hover:bg-gray-800 text-white font-bold rounded px-5 py-2 transition shadow focus:outline-none"
              >
                Hire Us
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ================= Main Section ================= */}
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border rounded-lg bg-white p-4 shadow-sm">
              <img
                src="https://via.placeholder.com/1000x600"
                alt="Project preview"
                className="rounded-lg w-full object-cover"
              />
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">
                CodeForYou Modern React & Tailwind Admin Dashboard
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                CodeForYou Admin is a modern and sleek dashboard template built
                with React 19 and Tailwind CSS v4. It provides an efficient,
                developer-friendly structure with prebuilt UI components,
                responsive layouts, and easy customization.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This template is designed for developers, startups, and college
                projects, ensuring clean architecture and beautiful design.
              </p>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <strong>Last Update:</strong> 8 November 2025
                </p>
                <p>
                  <strong>High Resolution:</strong> Yes
                </p>
                <p>
                  <strong>Compatible Browsers:</strong> Chrome, Edge, Safari,
                  Firefox
                </p>
                <p>
                  <strong>Framework:</strong> React 19
                </p>
                <p>
                  <strong>Files Included:</strong> HTML, CSS, JS
                </p>
                <p>
                  <strong>Columns:</strong> 4+
                </p>
                <p>
                  <strong>Layout:</strong> Responsive
                </p>
                <p>
                  <strong>Documentation:</strong> Well Documented
                </p>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <div className="bg-white border rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">Regular License</h3>
                <FaRegHeart className="text-gray-500 text-xl cursor-pointer" />
              </div>
              <p className="text-3xl font-bold">$19</p>
              <p className="text-sm text-gray-500 mt-1">
                Quality checked by CodeForYou
              </p>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800">
                  <FaShoppingCart className="inline-block mr-2" />
                  Add to Cart
                </button>
                <button className="flex-1 border border-black py-2 rounded-md font-semibold hover:bg-gray-100">
                  Live Preview
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Includes 6 months of support
              </p>
            </div>

            <div className="bg-white border rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-semibold mb-3">Highlights</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> Modern UI with
                  Tailwind CSS v4
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> React 19 Support
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> Fully Responsive
                  Design
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> Detailed Docs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* ================= Footer ================= */}
      <footer className="bg-black text-white pt-12 pb-6 border-t border-border mt-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h4 className="font-bold text-lg mb-2">CodeForYou</h4>
            <p className="mb-4 text-sm text-gray-400">
              Empowering Projects Globally
            </p>
            <div className="flex gap-3 text-xl">
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
              <a href="#">
                <FaGithub />
              </a>
              <a href="/adminAuth">
                <FaUserCircle />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/projects">Projects</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-400">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Web Projects for Students</li>
              <li>Custom Web Development</li>
              <li>College Project Guidance</li>
              <li>Startup MVP Development</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-400">Contact Info</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-1">
                <FaMapMarkerAlt /> CodeForYou Nashik Maharashtra 420012
              </li>
              <li className="flex items-center gap-1">
                <FaEnvelope /> contact@codeforyou.com
              </li>
              <li className="flex items-center gap-1">
                <FaPhone /> +91 90758 63917
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm border-t border-gray-700 pt-4">
          © 2025 CodeForYou. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
