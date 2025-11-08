import React, { useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import logo from "../assets/logo.png";

// 1. Define the expected project type
type Project = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  features?: string[];
  category: string;
  techStack?: string[];
  price?: number;
  lastUpdate?: string;
};

type Props = {
  project: Project;
  isLoggedIn?: boolean;
  isInWishlist?: boolean;
  onFavToggle?: () => void;
  onRequestProject?: () => void;
};

const ProjectDetailsPage: React.FC<Props> = ({
  project,
  isLoggedIn = true,
  isInWishlist = false,
  onFavToggle = () => {},
  onRequestProject = () => {},
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <header className="w-full bg-white shadow border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo and brand */}
          <div className="flex flex-col items-center gap-0">
            <img src={logo} alt="CodeForYou logo" className="h-6 w-auto" />
            <span className="font-bold text-xl">&lt;CodeForYou/&gt;</span>
          </div>
          {/* Mobile menu toggle button */}
          <button
            className="md:hidden flex items-center text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
          {/* Navigation links */}
          <nav
            className={`flex-col md:flex-row md:flex md:items-center md:gap-4 w-full md:w-auto ${
              mobileMenuOpen ? "flex" : "hidden"
            } md:flex`}
          >
            <a
              href="/project"
              className="block md:inline text-gray-700 hover:text-black font-medium px-3 py-2"
            >
              Projects
            </a>
            {!isLoggedIn ? (
              <>
                <a
                  href="/signin"
                  className="block md:inline text-gray-700 hover:text-black font-medium px-3 py-2"
                >
                  Sign in
                </a>
                <a
                  href="/signup"
                  className="block md:inline text-gray-700 hover:text-black font-medium px-3 py-2"
                >
                  Sign up
                </a>
              </>
            ) : (
              <div className="relative md:inline-block">
                {/* Profile dropdown if needed */}
              </div>
            )}
            <div className="relative ml-2">
              <button
                className="bg-black hover:bg-gray-800 text-white font-bold rounded px-5 py-2 transition shadow focus:outline-none"
                onClick={onRequestProject}
              >
                Request Custom Project
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* MAIN SECTION */}
      <main className="max-w-7xl mx-auto px-4 py-12 min-h-[70vh] flex flex-col md:flex-row gap-10">
        {/* Left: Project Images (gallery/grid possibility) */}
        <div className="flex-1 min-w-[260px] max-w-md">
          <div className="w-full rounded-lg overflow-hidden shadow-lg border mb-6">
            <img
              src={project.imageUrl}
              alt={project.name}
              className="w-full h-60 object-cover bg-gray-100"
            />
          </div>
          {/* Favorite button */}
          <button
            className={`w-full flex items-center gap-2 justify-center py-2 rounded-lg border transition 
              ${
                isInWishlist
                  ? "text-red-600 border-red-200 bg-red-50"
                  : "text-gray-500 border-gray-200 hover:bg-gray-100"
              }`}
            aria-label={
              isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
            }
            onClick={onFavToggle}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            {isInWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
          </button>
        </div>
        {/* Right: Project Content */}
        <div className="flex-[2] flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-black">
              {project.name}
            </h1>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {project.category || "Web Project"}
              </span>
              <span className="text-xs text-gray-500">
                Last updated: {project.lastUpdate || "Recently"}
              </span>
            </div>
            <div className="text-base text-gray-700 mb-3">
              {project.description}
            </div>
            <div className="flex gap-4 flex-wrap my-2">
              {project.techStack &&
                project.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="bg-gray-200 px-2 py-1 text-xs rounded-full font-mono text-gray-800"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          </div>
          <div className="my-3">
            <p className="font-semibold text-lg text-black">
              Features & Highlights:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              {project.features &&
                project.features.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
            </ul>
          </div>
          {/* Pricing & actions */}
          <div className="mt-3 flex gap-6 items-center">
            {project.price && project.price > 0 && (
              <span className="text-2xl font-bold text-black bg-yellow-100 rounded px-5 py-2 shadow-inner">
                ₹{project.price}
              </span>
            )}
            <button
              className="bg-black hover:bg-gray-800 text-white font-bold rounded px-6 py-3 shadow transition"
              onClick={onRequestProject}
            >
              Request/Buy this Project
            </button>
            {/* Optional: Live Preview button
            <a
              href={project.liveDemoURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold rounded px-6 py-3 shadow transition"
            >
              Live Preview
            </a>
            */}
          </div>
        </div>
      </main>

      {/* FOOTER: Use your exact branding/colors */}
      <footer className="bg-black text-white pt-12 pb-6 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h4 className="font-bold text-lg mb-2">CodeForYou</h4>
            <p className="mb-4 text-sm text-brandLight">
              Empowering Projects Globally
            </p>
            <div className="flex gap-3 text-xl">
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="/adminAuth" aria-label="Admin Login">
                <FaUserCircle />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-brandLight">Quick Links</h4>
            <ul className="space-y-2 text-brandLight">
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
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-brandLight">Services</h4>
            <ul className="space-y-2 text-brandLight">
              <li>Web Projects for Students</li>
              <li>Custom Web Development</li>
              <li>College Project Guidance</li>
              <li>Startup MVP Development</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-brandLight">Contact Info</h4>
            <ul className="space-y-2 text-brandLight text-sm">
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
        <div className="mt-8 text-center text-brandLight text-sm border-t border-brandLight pt-4">
          © 2025 CodeForYou. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetailsPage;
