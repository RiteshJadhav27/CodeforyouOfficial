import React, { useState, useEffect } from "react";
import logo from '../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaSignOutAlt,
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
  FaUserCircle
} from "react-icons/fa";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {app} from "../firebaseConfig";  
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

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

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
    name: '',
    email: '',
    phone: '',
    createdAt: null as string | null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true);
        setUsername(user.displayName || '');

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setProfileInfo({
            name: data.name || user.displayName || '',
            email: data.email || user.email || '',
            phone: data.phone || '',
            createdAt: data.createdAt ? data.createdAt.toDate().toLocaleString() : null,
          });
        } else {
          setProfileInfo({
            name: user.displayName || '',
            email: user.email || '',
            phone: '',
            createdAt: null,
          });
        }
      } else {
        setLoggedIn(false);
        setUsername('');
        setProfileInfo({ name: '', email: '', phone: '', createdAt: null });
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleEditMode = () => setEditMode(!editMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogout = () => {
    auth.signOut();
    setLoggedIn(false);
    setProfileOpen(false);
    navigate("/");
  };

  const handleSaveProfile = () => {
    setUsername(profileInfo.name);
    setEditMode(false);
    // Optionally add code to save profileInfo back to Firestore here
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Navbar */}
      <header className="w-full bg-white shadow border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex flex-col items-center gap-0">
            <img src={logo} alt="CodeForYou logo" className="h-6 w-auto" />
            <span className="font-bold text-xl">&lt;CodeForYou/&gt;</span>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-96 max-w-full">
              <input
                type="text"
                className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-2 pl-10 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="Search themes…"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <Link to="/projects" className="text-gray-700 hover:text-black font-medium">Projects</Link>
            {!loggedIn ? (
              <>
                <Link to="/signin" className="text-gray-700 hover:text-black font-medium">Sign in</Link>
                <Link to="/signup" className="text-gray-700 hover:text-black font-medium">Sign up</Link>
              </>
            ) : (
              <div className="relative">
                <button onClick={toggleProfile} className="flex items-center gap-2 text-gray-700 hover:text-black font-medium focus:outline-none">
                  <FaUserCircle size={28} />
                  <span>Welcome, {username}!</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg text-gray-900 z-50">
                    {!editMode ? (
                      <div className="p-4 space-y-3">
                        <div><strong>Name:</strong> {profileInfo.name}</div>
                        <div><strong>Email:</strong> {profileInfo.email}</div>
                        <div><strong>Phone:</strong> {profileInfo.phone}</div>
                        <div><strong>Member since:</strong> {profileInfo.createdAt || 'N/A'}</div>
                        <button
                          onClick={toggleEditMode}
                          className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
                        >
                          <FaEdit className="inline mr-2" /> Edit Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full bg-red-600 text-white rounded py-2 hover:bg-red-700 transition"
                        >
                          <FaSignOutAlt className="inline mr-2" /> Logout
                        </button>
                      </div>
                    ) : (
                      <form className="p-4 space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={profileInfo.name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={profileInfo.email}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={profileInfo.phone}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                          />
                        </div>
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={toggleEditMode}
                            className="bg-gray-300 rounded px-4 py-2"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveProfile}
                            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}
                        <div className="relative ml-2">
                          <button
                            onClick={toggleDropdown}
                            className="bg-black hover:bg-gray-800 text-white font-bold rounded px-5 py-2 transition shadow focus:outline-none"
                            aria-haspopup="true"
                            aria-expanded={dropdownOpen}
                          >
                            Hire us
                          </button>
            
                          {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
                              <li>
                                <Link
                                  to="/collaborate"
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  Collaborate with Us
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/request-project"
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  Request for Project
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/hire"
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  Hire Us
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/consultation"
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  Consultation
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center gap-16">
          <div className="flex-1">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-sm font-bold shadow">
                CodeForYou Club 🚀
              </span>
              <span className="ml-2 text-gray-600 text-sm">
                Access to all current and future services
              </span>
            </div>
            <h1 className="text-5xl font-extrabold mb-4 leading-tight text-gray-900">
              Build Project Websites <span className="text-black">10x Faster</span>
              <br />
              with Modern Tools and AI Agents.
            </h1>
            <p className="text-lg text-gray-600 mb-7 max-w-lg">
              Get templates and dashboards powered by React, Tailwind CSS, and AI. CodeForYou delivers
              customizable web solutions for students and startups.
            </p>
            <div className="flex items-center max-w-lg mb-10">
              <input
                type="text"
                placeholder="Search for UI Kits, Projects, Components..."
                className="flex-1 px-5 py-3 rounded-l-full border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none"
              />
              <button className="relative -ml-0 px-6 py-4 rounded-r-full bg-black text-white hover:bg-gray-800 transition">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 grid-rows-2 gap-5 overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80"
                alt="Demo 1"
                className="object-cover rounded-2xl shadow-lg h-44 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
                alt="Demo 2"
                className="object-cover rounded-2xl shadow-lg h-44 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
                alt="Demo 3"
                className="object-cover rounded-2xl shadow-lg h-44 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80"
                alt="Demo 4"
                className="object-cover rounded-2xl shadow-lg h-44 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Categories */}
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
                  className="w-full h-32 object-cover rounded-lg mb-4 shadow-sm"
                />
                <h3 className="text-xl font-semibold text-text mb-2 text-center">
                  {cat.name}
                </h3>
                <p className="text-mutedText text-sm mb-4 text-center">{cat.description}</p>

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

          <div className="flex justify-center mt-12 ">
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

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-gray-200 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-transform duration-300 relative"
            >
              <div className="relative">
                <img
                  src={proj.img}
                  alt={`${proj.name} screenshot`}
                  className="w-full h-56 object-cover object-center"
                />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-accent to-highlight text-black text-xs uppercase font-semibold px-3 py-2 rounded-full shadow">
                  {proj.badge}
                </span>
                <span className="absolute top-4 right-4 bg-dark/80 text-black text-xs px-2 py-1 rounded-full">
                  {proj.category}
                </span>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-accent hover:bg-dark text-black rounded-full p-2 shadow transition"
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2 text-dark dark:text-black  transition">
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
      <section id="about" className="py-16 px-6 md:px-12 bg-brandLight dark:bg-black">
        <h3 className="text-3xl font-bold text-center mb-8 text-white dark:text-brandLight">Why Choose Us?</h3>
        <div className="max-w-4xl mx-auto text-center text-white dark:text-brandLight leading-relaxed">
          <p>
            CodeForYou is more than just a project service — it's your tech partner.
            We provide personalized, scalable, and high-quality web solutions
            for students, freelancers, and startups who want to make an impact online.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-10 bg-white text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12 text-dark dark:text-brandLight">
          Contact Us
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Form Card */}
          <div className="bg-brand dark:bg-gray-200 rounded-3xl shadow-lg p-8 hover:shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-black dark:text-brandLight">Get In Touch</h3>
            <form className="space-y-5">
              <div>
                <label className="block text-sm mb-1 text-black dark:text-brandLight">Name</label>
                <input
                  className="w-full border border-black rounded px-4 py-2 focus:outline-black focus:ring-1 focus:ring-black bg-brand dark:bg-gray-100 text-white dark:text-brandLight"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-black dark:text-brandLight">Email</label>
                <input
                  type="email"
                  className="w-full border border-black rounded px-4 py-2 focus:outline-black focus:ring-1 focus:ring-black bg-brand dark:bg-gray-100 text-white dark:text-brandLight"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-black dark:text-brandLight">Phone</label>
                <input
                  type="tel"
                  className="w-full border border-black rounded px-4 py-2 focus:outline-black focus:ring-1 focus:ring-black bg-brand dark:bg-gray-100 text-white dark:text-brandLight"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-black dark:text-brandLight">Project Details</label>
                <textarea
                  rows={4}
                  className="w-full border border-black rounded px-4 py-2 focus:outline-black focus:ring-1 focus:ring-black bg-brand dark:bg-gray-100 text-white dark:text-brandLight"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black hover:bg-dark-500 text-white font-semibold py-2 rounded-full "
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Info Card */}
          <div className="bg-brand dark:bg-gray-200 rounded-3xl shadow-lg p-8 hover:shadow-2xl border border-border ">
            <h3 className="text-xl font-bold mb-6 text-black dark:text-brandLight">Contact Information</h3>
            <div className="space-y-6 text-black dark:text-brandLight">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-black text-2xl mt-1" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-sm">CodeForYou, Nashik, Maharashtra 420012</div>
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
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
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
            <p className="mb-4 text-sm text-brandLight">Empowering Projects Globally</p>
            <div className="flex gap-3 text-xl">
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-brandLight">Quick Links</h4>
            <ul className="space-y-2 text-brandLight">
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
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
              <li className="flex items-center gap-1"><FaMapMarkerAlt /> CodeForYou Nashik Maharashtra 420012</li>
              <li className="flex items-center gap-1"><FaEnvelope /> contact@codeforyou.com</li>
              <li className="flex items-center gap-1"><FaPhone /> +91 90758 63917</li>
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
