import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
  FaSearch,
  FaExternalLinkAlt,
  FaStar,
  FaInstagram,
  FaLightbulb,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaSignOutAlt,
  FaWhatsapp,
  FaClock,
  FaUserCircle,
  FaGlobe,
  FaBuilding,
  FaShoppingCart,
  FaLaptopCode,
  FaBook,
  FaRocket,
  FaMobileAlt,
  FaServer,
  FaTools,
  FaLock,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import RequestCustomProjectModal from "../components/RequestCustomProjectModal";

const db = getFirestore(app);
const auth = getAuth(app);

const categories = [
  {
    name: "Personal & Professional",
    description: "Personal/professional portfolio templates/Web services.",
    img: "", // No image, use icon
    icon: FaGlobe,
    badge: "Portfolio",
    linkNew: "#",
    linkBest: "#",
  },
  {
    name: "Startup/Business",
    description: "Corporate and business starter sites.",
    img: "",
    icon: FaBuilding,
    badge: "Business",
    linkNew: "#",
    linkBest: "#",
  },
  {
    name: "E-commerce & Retail",
    description: "E-Commerce & Retails Web/App templates.",
    img: "",
    icon: FaShoppingCart,
    badge: "Store",
    linkNew: "#",
    linkBest: "#",
  },
  {
    name: "Website/App Project's",
    description: "Designs for website/App projects.",
    img: "",
    icon: FaBook,
    badge: "Projects",
    linkNew: "#",
    linkBest: "#",
  },
  {
    name: "Marketing Pages",
    description: "Landing/marketing/email/promo pages.",
    img: "",
    icon: FaRocket,
    badge: "Marketing",
    linkNew: "#",
    linkBest: "#",
  },
  {
    name: "CMS/Custom Projects",
    description: "Custom CMS/admin dashboards.",
    img: "",
    icon: FaTools,
    badge: "CMS",
    linkNew: "#",
    linkBest: "#",
  },
];

const featuredProjects = [
  {
    id: "101",
    name: "Anime Tube",
    description:
      "A comprehensive Frontend and Backend video streaming platform dedicated to anime content with robust documentation, detailed architecture diagrams, and a polished final result showcasing seamless user experience.",
    imageURL:
      "https://res.cloudinary.com/dfayyzw68/image/upload/v1763096246/AnimeTubeHome1_lu1ieb.png",
    price: 0,
    category: "Entertainment",
    rating: 4.8,
    repoURL: "https://github.com/yourrepo/animetube",
    status: "Completed",
    technologies: ["React", "Node.js", "Firebase"],
    liveDemoURL: "/ProjectsPreview/AnimeTube/index.html",
    featured: true,
    createdAt: "2025-10-29T17:11:00Z",
  },
  {
    id: "108",
    name: "E-Learning Platform",
    description:
      "An educational platform featuring course management, user authentication, and interactive features. Includes full documentation and detailed architectural diagrams.",
    imageURL:
      "https://res.cloudinary.com/dfayyzw68/image/upload/v1763198337/AELearning_bvn72n.png",
    price: 2500,
    category: "Education",
    rating: 4.7,
    repoURL: "https://github.com/yourrepo/elearning",
    status: "Completed",
    technologies: ["Angular", "Firebase", "Node.js"],
    liveDemoURL: "/ProjectsPreview/ELearning/index.html",
    featured: true,
    createdAt: "2025-10-29T18:20:00Z",
  },
  {
    id: "112",
    name: "Fitness Site",
    description:
      "A fitness and wellness site featuring workout plans, health tracking with full backend integration and clear documentation supported by system diagrams.",
    imageURL:
      "https://res.cloudinary.com/dfayyzw68/image/upload/v1763208645/Aft_d0xlpj.png",
    price: 1200,
    category: "Health & Fitness",
    rating: 4.7,
    repoURL: "https://github.com/yourrepo/fitness-site",
    status: "Completed",
    technologies: ["React", "GraphQL", "Node.js"],
    liveDemoURL: "",
    featured: true,
    createdAt: "2025-10-29T19:00:00Z",
  },
  {
    id: "115",
    name: "Gym Gyaan",
    description:
      "Fitness knowledge-sharing platform with a fully integrated frontend/backend including documentation and system design diagrams.",
    imageURL:
      "https://res.cloudinary.com/dfayyzw68/image/upload/v1763199739/AGymGyaan_fqi9pv.png",
    price: 1100,
    category: "Health & Fitness",
    rating: 4.4,
    repoURL: "https://github.com/yourrepo/gym-gyaan",
    status: "Active",
    technologies: ["Angular", "Firebase", "Express"],
    liveDemoURL: "/ProjectsPreview/Gym-Gyaan/index.html",
    featured: false,
    createdAt: "2025-10-29T19:30:00Z",
  },
  {
    id: "127",
    name: "Pets Shop",
    description:
      "An e-commerce site specializing in pet supplies, featuring frontend and backend functionalities, supported by comprehensive diagrams and documentation.",
    imageURL:
      "https://res.cloudinary.com/dfayyzw68/image/upload/v1763207238/APet-Shop_kiowps.png",
    price: 750,
    category: "E-Commerce",
    rating: 4.0,
    repoURL: "https://github.com/yourrepo/pets-shop",
    status: "Active",
    technologies: ["React", "Firebase"],
    liveDemoURL: "/ProjectsPreview/Pets-Shop/index.html",
    featured: true,
    createdAt: "2025-10-29T21:30:00Z",
  },
  {
    id: "128",
    name: "Stylish Shoe",
    description:
      "A fashion-forward shoe e-commerce site featuring advanced backend support and an intuitive frontend experience with detailed system diagrams.",
    imageURL:
      "https://res.cloudinary.com/dfayyzw68/image/upload/v1763207416/Asylish_lnesp0.png",
    price: 1200,
    category: "E-Commerce",
    rating: 4.5,
    repoURL: "https://github.com/yourrepo/stylish-shoe",
    status: "Completed",
    technologies: ["Next.js", "Firebase"],
    liveDemoURL: "/ProjectsPreview/Stylish-Shoe/index.html",
    featured: true,
    createdAt: "2025-10-29T21:40:00Z",
  },
  // Add more predefined featured projects as needed, max 6
];

import img1 from "../assets/car-rent-website-template.jpg";
import img2 from "../assets/shipping-company-website-template.jpg";
import img3 from "../assets/vegetable-website-template.jpg";
import img4 from "../assets/elearning-html-template.jpg";
import img5 from "../assets/bootstrap-shop-template.jpg";
import img6 from "../assets/bootstrap-restaurant-template.jpg";
import img7 from "../assets/physical-therapy-website-template.jpg";
import img8 from "../assets/life-insurance-website-template.jpg";
import img9 from "../assets/Bussiness-templets.png";

const taglines = [
  "CodeForYou: Next-Gen Projects!",
  "Low cost⬇! High Qaulity Project⬆ .",
  "Blazing Fast Web Apps.",
  "Modern UIs, Minimal Code.",
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const whatsappNumber = "+91 90758 63917";

  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    phone: "",
    createdAt: null as string | null,
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true);
        setUsername(user.displayName || "");

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setProfileInfo({
            name: data.name || user.displayName || "",
            email: data.email || user.email || "",
            phone: data.phone || "",
            createdAt: data.createdAt
              ? data.createdAt.toDate().toLocaleString()
              : null,
          });
        } else {
          setProfileInfo({
            name: user.displayName || "",
            email: user.email || "",
            phone: "",
            createdAt: null,
          });
        }
      } else {
        setLoggedIn(false);
        setUsername("");
        setProfileInfo({ name: "", email: "", phone: "", createdAt: null });
        navigate("/signin");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Hero section
  const [tagIndex, setTagIndex] = useState(0);

  // Tagline ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((idx) => (idx + 1) % taglines.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);
  const heroImagesRow1 = [img1, img2, img3, img4];
  const heroImagesRow2 = [img5, img6, img7, img8, img9];

  function TrainMarqueeRow({
    imgs,
    direction = "left",
    durationMultiplier = 4, // per item multiplier -> total duration = imgs.length * durationMultiplier
    pauseOnHover = true,
  }: {
    imgs: string[];
    direction?: "left" | "right";
    durationMultiplier?: number;
    pauseOnHover?: boolean;
  }) {
    const controls = useAnimation();
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // dimensions used to compute the translate target (in px).
    // these should match image width + gap. Adjust if your CSS changes.
    const IMAGE_WIDTH = 260; // px approximate
    const GAP = 24; // px (gap-6)
    const totalWidth = imgs.length * (IMAGE_WIDTH + GAP);

    useEffect(() => {
      let mounted = true;
      let isPaused = false;

      async function runLoop() {
        const directionFactor = direction === "left" ? -1 : 1;
        const totalDuration = Math.max(4, imgs.length * durationMultiplier); // seconds

        while (mounted) {
          // 1) Move from start to end
          await controls.start({
            x: directionFactor * -totalWidth,
            opacity: 10,
            transition: { duration: totalDuration, ease: "linear" },
          });

          if (!mounted) break;

          // 2) Fade out quickly so reset is invisible
          await controls.start({
            opacity: 0,
            transition: { duration: 0.08 },
          });

          if (!mounted) break;

          // 3) Immediately reset to start (no transition)
          await controls.set({ x: 0 });

          // 4) Fade in quickly
          await controls.start({
            opacity: 1,
            transition: { duration: 10 },
          });

          // small pause between cycles if desired
          // await new Promise((r) => setTimeout(r, 250));
        }
      }

      runLoop();

      return () => {
        mounted = false;
        // stop any pending animation
        controls.stop();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgs, direction, durationMultiplier]);

    // Optional pause on hover: stops/starts the animation controls
    const onMouseEnter = () => {
      if (pauseOnHover) controls.stop();
    };
    const onMouseLeave = () => {
      // restarting the loop is handled by the running async loop — stop() just pauses current animation,
      // the next loop iteration will continue normally. To be safe, we can trigger a small noop start:
      // (No explicit call required — the async loop will continue.)
    };

    return (
      <div
        className="overflow-hidden w-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={containerRef}
      >
        <motion.div
          className="flex gap-6 items-center"
          animate={controls}
          initial={{ x: -500, opacity: 5 }}
          style={{ willChange: "transform, opacity" }}
        >
          {imgs.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`marquee-${i}`}
              draggable={false}
              className="h-30 sm:h-36 rounded-2xl shadow-md object-cover border-4 border-white select-none pointer-events-none"
              style={{ minWidth: IMAGE_WIDTH }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    try {
      setLoading(true);
      await addDoc(collection(db, "contactUs"), {
        ...contactForm,
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      setSuccessMsg("Message sent! We'll get back within 24 hours.");
      setContactForm({ name: "", email: "", phone: "", details: "" });
    } catch (error) {
      setLoading(false);
      setErrorMsg("Could not send your message. Please try again.");
    }
  };
  const handleLogout = () => {
    auth.signOut();
    setLoggedIn(false);
    setProfileOpen(false);
    navigate("/");
  };

  const openProfile = () => {
    navigate("/profile");
  };

  const handleHireClick = () => {
    navigate("/hire");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Navbar */}
      <header className="w-full bg-white shadow border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="CodeForYou logo" className="h-7 w-auto" />
            <span className="font-bold text-lg md:text-xl">
              &lt;CodeForYou/&gt;
            </span>
          </div>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="relative w-96 max-w-full">
              <input
                type="text"
                className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-2 pl-10 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="Search themes…"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/project"
              className="text-gray-700 hover:text-black font-medium"
            >
              Projects
            </Link>

            {!loggedIn ? (
              <>
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-black font-medium"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-black font-medium"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="relative" tabIndex={0}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 text-gray-700 hover:text-black font-semibold focus:outline-none rounded-lg px-4 py-2"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  <FaUserCircle size={28} className="text-gray-600" />
                  <span className="hidden sm:inline">
                    Welcome, {profileInfo.name}!
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-xl shadow-lg text-gray-900 z-50 p-3">
                    <button
                      onClick={() => {
                        openProfile();
                        setProfileOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 font-medium flex items-center gap-2"
                    >
                      <FaUser />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 font-medium text-red-600 flex items-center gap-2"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleHireClick}
              className="bg-black hover:bg-gray-800 text-white font-bold rounded px-5 py-2 transition shadow focus:outline-none"
            >
              Hire Us
            </button>
          </nav>

          {/* Mobile right side: search icon + menu */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Small search for mobile (optional inline) */}
            <button
              onClick={() => setShowMobileSearch((prev) => !prev)}
              className="p-2 rounded-full border border-gray-300 text-gray-600"
            >
              <FaSearch />
            </button>

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2 rounded-md border border-gray-300 text-gray-700"
              aria-label="Toggle navigation"
            >
              <span className="block w-5 h-[2px] bg-gray-800 mb-1"></span>
              <span className="block w-5 h-[2px] bg-gray-800 mb-1"></span>
              <span className="block w-5 h-[2px] bg-gray-800"></span>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {showMobileSearch && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-2 pl-10 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="Search themes…"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 px-4 pb-4 space-y-3 bg-white">
            <Link
              to="/project"
              className="block pt-3 text-gray-700 hover:text-black font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Projects
            </Link>

            {!loggedIn ? (
              <>
                <Link
                  to="/signin"
                  className="block text-gray-700 hover:text-black font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="block text-gray-700 hover:text-black font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    openProfile();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left text-gray-700 hover:text-black font-medium flex items-center gap-2"
                >
                  <FaUserCircle />
                  <span>Profile ({profileInfo.name})</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            )}

            <button
              onClick={() => {
                handleHireClick();
                setMobileOpen(false);
              }}
              className="w-full mt-2 bg-black hover:bg-gray-800 text-white font-bold rounded px-5 py-2 transition shadow focus:outline-none"
            >
              Hire Us
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* LEFT: Animated Taglines */}
          <div className="flex flex-col items-center md:items-start md:pr-10">
            {/* CLUB TAG */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white text-xs tracking-wider font-bold shadow-lg shadow-black/20"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-7 w-7 rounded-full bg-white p-1"
              />
              CodeForYou Club 🚀
            </motion.div>

            {/* DYNAMIC TAGLINE */}
            <div className="h-24 sm:h-32 relative flex flex-col justify-center mb-3 w-full md:w-[101%]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={tagIndex}
                  className="font-black text-center md:text-left text-3xl sm:text-5xl lg:text-6xl leading-tight w-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.55 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
                    {taglines[tagIndex]}
                  </span>
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* SUBTEXT */}
            <p className="text-base sm:text-xl text-gray-600 mb-8 max-w-md text-center md:text-left leading-relaxed">
              Beautiful templates, dashboards & AI-powered components for
              students, developers & modern teams — all in one marketplace.
            </p>

            {/* SEARCH BAR */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-2 mb-7 max-w-md">
              <input
                type="text"
                placeholder="Find UI kits, projects, components..."
                className="flex-1 w-full px-5 py-3 rounded-full border border-gray-300 bg-white 
            focus:ring-2 focus:ring-blue-500 focus:outline-none text-base shadow-sm"
              />
              <button
                className="mt-4 sm:mt-0 px-7 py-3 rounded-full text-white font-bold 
          bg-gradient-to-r from-blue-700 to-violet-600 
          hover:from-violet-700 hover:to-blue-700 
          shadow-lg transition flex items-center justify-center"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* RIGHT: Photo-frame scroll images, staggered positions */}
          <div className="w-full max-w-5xl mx-auto space-y-6 py-5">
            {/* UPPER ROW → move LEFT */}
            <TrainMarqueeRow
              imgs={heroImagesRow1}
              direction="left"
              durationMultiplier={4}
            />

            {/* LOWER ROW → move RIGHT */}
            <TrainMarqueeRow
              imgs={heroImagesRow2}
              direction="right"
              durationMultiplier={4}
            />
          </div>
        </div>

        {/* Buttons below search bar 
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 mb-2">
          <button
            className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-full shadow-md hover:bg-zinc-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 transition text-base sm:text-lg"
            onClick={() => {
              /* handleRequestCustom() 
            }}
          >
            Request Custom Project
          </button>
          <button
            className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-full shadow-md hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base sm:text-lg"
            onClick={() => {
              /* handlePartnerWithUs() 
            }}
          >
            Partner With Us
          </button>
        </div>*/}
      </section>

      {/* Categories Section */}
      <section className="bg-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
            Explore Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/80 rounded-xl flex flex-col items-center p-6 shadow hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                  <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 shadow mb-5">
                    {cat.img ? (
                      <img
                        src={cat.img}
                        alt={cat.name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : (
                      <IconComponent className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 text-center text-sm mb-4">
                    {cat.description}
                  </p>
                  <span className="inline-block bg-indigo-100 text-indigo-800 font-semibold rounded-full px-3 py-1 text-xs mb-3 shadow">
                    {cat.badge}
                  </span>
                  <div className="flex gap-3">
                    <a
                      href={cat.linkNew}
                      className="text-indigo-700 font-semibold text-xs px-4 py-2 border border-indigo-300 rounded-full hover:bg-indigo-700 hover:text-white transition"
                    >
                      Newest
                    </a>
                    <a
                      href={cat.linkBest}
                      className="text-pink-600 font-semibold text-xs px-4 py-2 border border-pink-300 rounded-full hover:bg-pink-600 hover:text-white transition"
                    >
                      Bestsellers
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Featured Projects */}
      <section
        id="projects"
        className="py-16 px-6 bg-white text-gray-900"
        aria-label="Featured Projects"
      >
        <h3 className="text-4xl font-extrabold text-center mb-14 border-b border-gray-300 pb-6">
          Featured Projects
        </h3>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg hover:border-indigo-500 transition transform duration-300 flex flex-col"
            >
              <div className="relative overflow-hidden rounded-t-lg h-48">
                <img
                  src={proj.imageURL.trim()}
                  alt={proj.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-indigo-600 px-3 py-1 rounded-full text-xs font-semibold text-white shadow">
                  {proj.category}
                </span>
                <a
                  href={proj.liveDemoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-indigo-700 p-2 rounded-full shadow hover:bg-indigo-800 transition"
                  aria-label={`Live demo of ${proj.name}`}
                >
                  <FaExternalLinkAlt size={16} />
                </a>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-lg font-bold mb-2">{proj.name}</h4>
                <p className="text-gray-600 text-sm flex-grow line-clamp-3">
                  {proj.description}
                </p>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar /> <span>{proj.rating.toFixed(1)}</span>
                  </div>
                  <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded text-xs font-semibold">
                    {proj.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate("/project")} // Change this to your route
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition text-lg"
              aria-label="View more projects"
            >
              View More Projects
            </button>
          </div>
        </div>
      </section>
      {/* Why Choose Us?*/}
      <section
        id="services"
        className="py-10 px-6 md:px-12 bg-gray-100 text-gray-500"
      >
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Why Choose Us?
        </h3>
        <div className="max-w-4xl mx-auto text-center text-gray-700 leading-relaxed mb-12">
          <p>
            CodeForYou is more than just a project service — it's your tech
            partner. We provide personalized, scalable, and high-quality web
            solutions for students, freelancers, and startups looking to make an
            impact online.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto mt-10">
          {/* Fast Delivery */}
          <div className="flex flex-col items-center text-center rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-5 bg-indigo-100 rounded-full mb-4 text-indigo-600">
              <FaRocket size={40} />
            </div>
            <h4 className="text-lg font-semibold mb-2">Fast Delivery</h4>
            <p className="text-gray-600 text-sm">
              Rapid project completion without sacrificing quality.
            </p>
          </div>

          {/* Professional Work */}
          <div className="flex flex-col items-center text-center rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-5 bg-green-100 rounded-full mb-4 text-green-600">
              <FaLightbulb size={40} />
            </div>
            <h4 className="text-lg font-semibold text-black mb-2">
              Professional Work
            </h4>
            <p className="text-gray-600 text-sm">
              Clean code, modern UI, and optimized backend.
            </p>
          </div>

          {/* Secure & Reliable */}
          <div className="flex flex-col items-center text-center rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-5 bg-blue-100 rounded-full mb-4 text-blue-600">
              <FaLock size={40} />
            </div>
            <h4 className="text-lg font-semibold text-black mb-2">
              Secure & Reliable
            </h4>
            <p className="text-gray-600 text-sm">
              Your project and data are protected with top-level security.
            </p>
          </div>

          {/* Affordable Pricing */}
          <div className="flex flex-col items-center text-center rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-5 bg-green-100 rounded-full mb-4 text-green-600">
              <HiCurrencyRupee size={40} />
            </div>
            <h4 className="text-lg font-semibold text-black mb-2">
              Affordable Pricing
            </h4>
            <p className="text-gray-600 text-sm">
              Affordable, transparent, and fair pricing.
            </p>
          </div>

          {/* Dedicated Support */}
          <div className="flex flex-col items-center text-center rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-5 bg-yellow-100 rounded-full mb-4 text-yellow-600">
              <FaUsers size={40} />
            </div>
            <h4 className="text-lg font-semibold text-black mb-2">
              Dedicated Support
            </h4>
            <p className="text-gray-600 text-sm">
              Guiding you from concept to deployment with ongoing assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Service */}
      <section id="services" className="py-20 px-6 md:px-12 bg-white ">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-gray-900 dark:text-black">
          Our Services
        </h2>

        <p className="text-center max-w-3xl mx-auto text-gray-700 dark:text-black mb-14">
          At <span className="font-semibold">CodeForYou</span>, we build modern,
          scalable, and high-quality digital solutions for students, startups,
          and businesses. Crafted with perfection, delivered with excellence.
        </p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Website Development */}
          <div className="group rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg p-8 rounded-3xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-lg mb-6">
              <FaLaptopCode size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-black">
              Website Development
            </h3>
            <p className="dark:text-black">
              Beautiful, responsive, and high-performance websites for any
              purpose.
            </p>
          </div>

          {/* Web Apps / Dashboards */}
          <div className="group rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg p-8 rounded-3xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-2xl shadow-lg mb-6">
              <FaMobileAlt size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-black">
              Web Apps & Dashboards
            </h3>
            <p className="dark:text-black">
              Full-stack apps, custom dashboards, panels, and interactive
              systems.
            </p>
          </div>

          {/* Student Projects */}
          <div className="group rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg p-8 rounded-3xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-pink-600 text-white rounded-2xl shadow-lg mb-6">
              <FaTools size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-black">
              Project Development (Students)
            </h3>
            <p className="dark:text-black">
              Custom + ready-made projects with documentation & deployment
              support.
            </p>
          </div>

          {/* eCommerce */}
          <div className="group rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg p-8 rounded-3xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-500 text-white rounded-2xl shadow-lg mb-6">
              <FaShoppingCart size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-black">
              eCommerce Solutions
            </h3>
            <p className="dark:text-black">
              Online store setup, payments, admin panel, product management.
            </p>
          </div>

          {/* Backend & API */}
          <div className="group rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg p-8 rounded-3xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-2xl shadow-lg mb-6">
              <FaServer size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-black">
              Backend & API Development
            </h3>
            <p className="dark:text-black">
              Secure APIs, optimized backend architecture, authentication
              systems.
            </p>
          </div>

          {/* Deployment */}
          <div className="group rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg p-8 rounded-3xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-2xl shadow-lg mb-6">
              <FaRocket size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-black">
              Deployment & Hosting
            </h3>
            <p className="dark:text-black">
              Deploy on Vercel, Firebase, AWS, Netlify & more — smoothly and
              fast.
            </p>
          </div>
        </div>
        <RequestCustomProjectModal />
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-10 bg-gray-100 text-black">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold tracking-tight mb-3 text-black">
              Contact <span className="text-indigo-600">Us</span>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Have a project? Questions? Partnership inquiries? Reach out, and
              we'll get back within 24 hours.
            </p>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg p-8 flex flex-col justify-center hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-7 text-black">
                Get In Touch
              </h3>
              <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleFormChange}
                    className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white transition"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleFormChange}
                    className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white transition"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleFormChange}
                    className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white transition"
                    placeholder="+91 9XXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Project Details
                  </label>
                  <textarea
                    name="details"
                    rows={4}
                    value={contactForm.details}
                    onChange={handleFormChange}
                    className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white transition"
                    placeholder="Describe your project or message..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {successMsg && (
                  <div className="text-green-600 font-semibold mt-2">
                    {successMsg}
                  </div>
                )}
                {errorMsg && (
                  <div className="text-red-500 font-semibold mt-2">
                    {errorMsg}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg p-8 space-y-7 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-3 text-black">
                Contact Information
              </h3>
              <div className="space-y-6 text-black">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-black text-2xl" />
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-sm">
                      CodeForYou, Nashik, Maharashtra 420012
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-black text-2xl" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm">contact@codeforyou.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaPhone className="text-black text-2xl" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-sm">+91 90758 63917</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaWhatsapp className="text-black text-2xl" />
                  <div>
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-sm">+91 90758 63917</div>
                    <button
                      type="button"
                      onClick={() => {
                        window.open(
                          `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`,
                          "_blank"
                        );
                      }}
                      className="mt-2 px-3 py-1 bg-black text-white rounded-full hover:bg-gray-800 transition text-xs font-semibold"
                    >
                      Message Us
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaClock className="text-black text-2xl" />
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
