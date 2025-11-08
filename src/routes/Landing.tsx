import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaExternalLinkAlt,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaClock,
  FaUserCircle,
  FaGithub,
} from "react-icons/fa";

const categories = [
  {
    name: "Portfolio Sites",
    description: "Personal and professional portfolio templates.",
    img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=400&q=80",
    badge: "Portfolio",
    linkNew: "#",
    linkBest: "#",
  },
  {
    name: "eCommerce Websites",
    description: "Beautiful online shop and store templates.",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80",
    badge: "Store",
    linkNew: "#",
    linkBest: "#",
  },
  {
    name: "Blogs",
    description: "Modern designs for blogs and content creators.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
    badge: "Blog",
    linkNew: "#",
    linkBest: "#",
  },
  {
    name: "Marketing Pages",
    description: "Landing pages and email templates for promotions.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
    badge: "Marketing",
    linkNew: "#",
    linkBest: "#",
  },
  {
    name: "Startup/Business",
    description: "Corporate and business starter sites.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
    badge: "Business",
    linkNew: "#",
    linkBest: "#",
  },
  {
    name: "CMS/Custom Projects",
    description: "Custom CMS, admin panels, and dashboards.",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80",
    badge: "CMS",
    linkNew: "#",
    linkBest: "#",
  },
];

const featuredProjects = [
  {
    id: 1,
    name: "SmartEye DR",
    desc: "AI-based medical imaging demo project for diabetic retinopathy detection.",
    img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=400&q=80",
    category: "AI/Healthcare",
    badge: "New",
    link: "#",
  },
  {
    id: 2,
    name: "GeoGuardian Safety",
    desc: "Tourism safety dashboard with geofencing and risk scoring.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
    category: "Tourism",
    badge: "Featured",
    link: "#",
  },
  {
    id: 3,
    name: "CodeForYou Starter Portfolio",
    desc: "Personal portfolio site template for students and creators.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
    category: "Portfolio",
    badge: "Top Pick",
    link: "#",
  },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleHireClick = () => {
    navigate("/hire");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({ name: "John Doe", email: "john@example.com" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: "", email: "" });
    setShowProfile(false);
  };
  const handleHireUsClick = () => {
    // Handle your Hire Us click if needed, or route to hire page
    alert("Hire Us clicked");
  };
  const handleRequestProjectClick = () => {
    setShowRequestModal(true);
  };

  const closeRequestModal = () => {
    setShowRequestModal(false);
  };
  const handleHireTeamClick = () => {
    // Handle Hire Developer Team click or navigation
    alert("Hire Developer Team clicked");
  };
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
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
              <div className="relative md:inline-block">
                {/* Profile dropdown within nav */}
              </div>
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

      {/* Hero Section */}
      <section className="bg-gray-100 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-12">
          <div className="flex-1">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-sm font-bold shadow">
                CodeForYou Club 🚀
              </span>
              <span className="ml-2 text-gray-600 text-sm">
                Access to all current and future services
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
              Build Project Websites{" "}
              <span className="text-black">10x Faster</span>
              <br />
              with Modern Tools and AI Agents.
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg">
              Get templates and dashboards powered by React, Tailwind CSS, and
              AI. CodeForYou delivers customizable web solutions for students
              and startups.
            </p>
            <div className="flex items-center max-w-lg">
              <input
                type="text"
                placeholder="Search for UI Kits, Projects, Components..."
                className="flex-1 px-5 py-3 rounded-l-full border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none"
              />
              <button className="relative -ml-0 px-6 py-4 rounded-r-full bg-black text-white hover:bg-gray-800 transition">
                <FaSearch />
              </button>
            </div>
            {/* <div className="flex justify-center space-x-6 max-w-lg mx-auto">
              <button
                onClick={handleHireClick}
                className="bg-black text-white font-bold rounded-full px-8 py-3 hover:bg-gray-800 transition shadow"
              >
                Hire Us
              </button>
              <button
                onClick={handleHireTeamClick}
                className="bg-gray-800 text-white font-bold rounded-full px-8 py-3 hover:bg-gray-900 transition shadow"
              >
                Hire Developer Team
              </button>
            </div> */}
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 grid-rows-2 gap-5 rounded-3xl overflow-hidden">
              {[
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
              ].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Demo ${idx + 1}`}
                  className="object-cover rounded-2xl shadow-lg h-44 w-full"
                />
              ))}
            </div>
          </div>
        </div>
        {/* Request Custom Project Modal (implement your form, close, and submit logic here) */}
        {showRequestModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 relative">
              <button
                className="absolute top-4 right-4 text-xl text-gray-400 hover:text-gray-700"
                onClick={() => setShowRequestModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Request a Custom Project
              </h2>
              {/* Your form inputs here */}
              {/* Example: */}
              <form>
                {/* Add inputs for name, email, mobile, message etc */}
                {/* Submit button */}
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-text mb-12">
            Explore Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-32 sm:h-40 object-cover rounded-lg mb-4 shadow-sm"
                />
                <h3 className="text-xl font-semibold text-text mb-2 text-center">
                  {cat.name}
                </h3>
                <p className="text-mutedText text-sm mb-4 text-center">
                  {cat.description}
                </p>

                <div className="flex space-x-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent text-text font-medium text-xs">
                    {cat.badge}
                  </span>
                </div>

                <div className="flex gap-4">
                  <a
                    href={cat.linkNew}
                    className="text-text hover:text-accent font-medium text-sm transition"
                  >
                    Newest
                  </a>
                  <a
                    href={cat.linkBest}
                    className="text-text hover:text-accent font-medium text-sm transition"
                  >
                    Bestsellers
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button className="bg-text text-background px-8 py-3 rounded-full font-semibold transition">
              View all categories
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section
        id="projects"
        className="py-20 px-4 md:px-10 bg-brandLight dark:bg-dark"
      >
        <h3 className="text-4xl font-bold text-center mb-12 text-dark dark:text-brandLight">
          <span className="bg-gradient-to-r from-accent via-highlight to-accent bg-clip-text">
            Featured Projects
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-gray-200 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-transform duration-300 relative"
            >
              {/* Project Image */}
              <div className="relative">
                <img
                  src={proj.img}
                  alt={`${proj.name} screenshot`}
                  className="w-full h-56 object-cover object-center"
                />
                {/* Badge */}
                <span className="absolute top-4 left-4 bg-gradient-to-r from-accent to-highlight text-black text-xs uppercase font-semibold px-3 py-2 rounded-full shadow">
                  {proj.badge}
                </span>
                {/* Category */}
                <span className="absolute top-4 right-4 bg-dark/80 text-black text-xs px-2 py-1 rounded-full">
                  {proj.category}
                </span>
                {/* External Link */}
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-accent hover:bg-dark text-black rounded-full p-2 shadow transition"
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2 text-dark dark:text-black transition">
                  {proj.name}
                </h4>
                <p className="text-sm text-black-800 dark:text-black-300">
                  {proj.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 px-6 md:px-12 bg-brandLight dark:bg-black"
      >
        <h3 className="text-3xl font-bold text-center mb-8 text-white dark:text-brandLight">
          Why Choose Us?
        </h3>
        <div className="max-w-4xl mx-auto text-center text-white dark:text-brandLight leading-relaxed">
          <p>
            CodeForYou is more than just a project service — it's your tech
            partner. We provide personalized, scalable, and high-quality web
            solutions for students, freelancers, and startups who want to make
            an impact online.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-10 bg-white text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12 text-dark dark:text-brandLight">
          Contact Us
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Card */}
          <div className="bg-brand dark:bg-gray-200 rounded-3xl shadow-lg p-8 hover:shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-black dark:text-brandLight">
              Get In Touch
            </h3>
            <form className="space-y-5">
              <div>
                <label className="block text-sm mb-1 text-black dark:text-brandLight">
                  Name
                </label>
                <input className="w-full border border-black rounded px-4 py-2 focus:outline-black focus:ring-1 focus:ring-black bg-brand dark:bg-gray-100 text-white dark:text-brandLight" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-black dark:text-brandLight">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-black rounded px-4 py-2 focus:outline-black focus:ring-1 focus:ring-black bg-brand dark:bg-gray-100 text-white dark:text-brandLight"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-black dark:text-brandLight">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full border border-black rounded px-4 py-2 focus:outline-black focus:ring-1 focus:ring-black bg-brand dark:bg-gray-100 text-white dark:text-brandLight"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-black dark:text-brandLight">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-black rounded px-4 py-2 focus:outline-black focus:ring-1 focus:ring-black bg-brand dark:bg-gray-100 text-white dark:text-brandLight"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black hover:bg-dark-500 text-white font-semibold py-2 rounded-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Info Card */}
          <div className="bg-brand dark:bg-gray-200 rounded-3xl shadow-lg p-8 hover:shadow-2xl border border-border">
            <h3 className="text-xl font-bold mb-6 text-black dark:text-brandLight">
              Contact Information
            </h3>
            <div className="space-y-6 text-black dark:text-brandLight">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-black text-2xl mt-1" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-sm">
                    CodeForYou, Nashik, Maharashtra 420012
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-black text-2xl mt-1" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm">contact@codeforyou.com</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaPhone className="text-black text-2xl mt-1" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-sm">+91 90758 63917</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaWhatsapp className="text-black text-2xl mt-1" />
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm">+91 90758 63917</div>
                  <button className="mt-2 px-3 py-1 bg-black text-white rounded-full hover:bg-dark transition text-xs font-semibold">
                    Message Us
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaClock className="text-black text-2xl mt-1" />
                <div>
                  <div className="font-semibold">Working Hours</div>
                  <div className="text-sm">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <a href="#" aria-label="YouTube">
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

export default Landing;
