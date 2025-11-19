"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaEdit,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import projectsData from "../data/projects.json";

const auth = getAuth(app);
const db = getFirestore(app);

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<{
    name: string;
    email: string;
    uid?: string;
  } | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [requestSuccess, setRequestSuccess] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser) {
        const userDocRef = doc(db, "users", loggedUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUser({
            uid: loggedUser.uid,
            name: data.name || loggedUser.displayName || "User",
            email: data.email || loggedUser.email || "",
          });
          setRequestForm((f) => ({
            ...f,
            name: data.name || loggedUser.displayName || "",
            email: data.email || loggedUser.email || "",
          }));
        } else {
          setUser({
            uid: loggedUser.uid,
            name: loggedUser.displayName || "User",
            email: loggedUser.email || "",
          });
          setRequestForm((f) => ({
            ...f,
            name: loggedUser.displayName || "User",
            email: loggedUser.email || "",
          }));
        }
      } else {
        setUser(null);
      }
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
        setEditMode(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    navigate("/");
  };

  const filteredProjects = projectsData.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleHomeClick = () => {
    if (user) navigate("/userdashboard");
    else navigate("/");
  };

  // Related projects for modal
  const relatedProjects = (
    selectedProject
      ? projectsData.filter(
          (p) =>
            p.category === selectedProject.category &&
            p.id !== selectedProject.id
        )
      : []
  ).slice(0, 3);

  // Request Modal handlers
  const openRequestModal = () => {
    setShowRequestModal(true);
    setRequestSuccess(false);
  };
  const closeRequestModal = () => {
    setShowRequestModal(false);
    setRequestForm((f) => ({
      ...f,
      message: "",
      phone: "",
    }));
  };
  const handleRequestFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRequestForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  // The FINAL Firestore store logic
  const handleRequestFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    try {
      await addDoc(collection(db, "hireRequests"), {
        userId: user?.uid || null,
        type: "projectRequest",
        name: requestForm.name,
        email: requestForm.email,
        mobile: requestForm.phone || "",
        subject: selectedProject.name || "",
        message: requestForm.message,
        company: "",
        timeline: "",
        createdAt: serverTimestamp(),
        status: "pending",
        projectId: selectedProject.id,
        projectCategory: selectedProject.category || "",
      });

      setRequestSuccess(true);

      Swal.fire({
        icon: "success",
        title: "Request Sent!",
        text: "Thank you for your request. Our team will contact you within 24 hours.",
        confirmButtonColor: "#000000",
      });

      setRequestForm((f) => ({
        ...f,
        message: "",
        phone: "",
      }));

      setTimeout(closeRequestModal, 2500);
    } catch (error) {
      console.error("Error saving request:", error);

      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#000000",
      });
    }
  };

  // Modify toggleWishlist to update Firestore
  const toggleWishlist = async (projectId: string) => {
    if (!user?.uid) {
      alert("Please login to add to wishlist");
      return;
    }
    const userDocRef = doc(db, "users", user.uid);
    const isInWishlist = wishlist.includes(projectId);
    try {
      if (isInWishlist) {
        await updateDoc(userDocRef, {
          wishlist: arrayRemove(projectId),
        });
        setWishlist((prev) => prev.filter((id) => id !== projectId));
      } else {
        await updateDoc(userDocRef, {
          wishlist: arrayUnion(projectId),
        });
        setWishlist((prev) => [...prev, projectId]);
      }
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Navbar */}
      <header className="w-full bg-white shadow border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-3">
          <div className="flex flex-col items-center gap-0">
            <img src={logo} alt="CodeForYou logo" className="h-6 w-auto" />
            <span className="font-bold text-xl">&lt;CodeForYou/&gt;</span>
          </div>
          <div className="flex-1 flex justify-center mt-2 md:mt-0">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-2 pl-10 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="Search projects…"
                aria-label="Search projects"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            </div>
          </div>
          <nav className="flex items-center gap-4 mt-3 md:mt-0">
            <button
              onClick={handleHomeClick}
              className="text-gray-700 hover:text-black font-medium"
            >
              Home
            </button>
            {!user ? (
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
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-black font-medium focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  <FaUserCircle size={28} />
                  <span className="hidden md:inline">Welcome, {user.name}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                    {!editMode ? (
                      <>
                        <div className="mb-2">
                          <strong>Name:</strong> {user.name}
                        </div>
                        <div className="mb-2">
                          <strong>Email:</strong> {user.email}
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                          <button
                            onClick={() => setEditMode(true)}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
                          >
                            <FaEdit className="mr-2" /> Edit Profile
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition flex items-center justify-center"
                          >
                            <FaSignOutAlt className="mr-2" /> Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <form className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={user.name}
                            readOnly
                            className="w-full border border-gray-300 rounded px-3 py-2 cursor-not-allowed bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full border border-gray-300 rounded px-3 py-2 cursor-not-allowed bg-gray-100"
                          />
                        </div>
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-gray-300 rounded px-4 py-2"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            disabled
                            className="bg-blue-600 text-white rounded px-4 py-2 opacity-50 cursor-not-allowed"
                            title="Save currently disabled"
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

            <Link
              to="/hire"
              className="ml-2 bg-black hover:bg-gray-800 text-white font-bold rounded px-5 py-2 transition shadow"
            >
              Hire us
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-surface border-b border-border py-12 mb-8 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold mb-2 text-text">
            Our Projects
          </h1>
          <p className="text-mutedText text-lg mb-4">
            Discover innovative web projects built by the CodeForYou team.
            Explore, learn, and get inspired!
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-surface rounded-2xl shadow-lg hover:shadow-2xl border border-border transition-transform hover:-translate-y-2 flex flex-col cursor-pointer"
              aria-label={`Project: ${project.name}`}
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.imageURL}
                alt={`Screenshot of ${project.name}`}
                className="rounded-t-2xl object-cover h-44 w-full"
                loading="lazy"
              />
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-xl font-bold text-text mb-2">
                  {project.name}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-text font-medium text-xs mb-3">
                  {project.category}
                </span>
                <p className="text-mutedText mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold text-xs ${
                      project.status === "Active"
                        ? "bg-background text-text"
                        : "bg-mutedText text-background"
                    }`}
                  >
                    {project.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label={
                        wishlist.includes(project.id)
                          ? `Remove ${project.name} from wishlist`
                          : `Add ${project.name} to wishlist`
                      }
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent other click events
                        toggleWishlist(project.id);
                      }}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      {wishlist.includes(project.id) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                    <button
                      type="button"
                      className="bg-green-600 text-white px-4 py-1 rounded-full font-bold hover:bg-green-700 transition text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        openRequestModal();
                      }}
                    >
                      Request Project
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div
            className="text-center text-mutedText py-24 text-lg"
            role="alert"
            aria-live="polite"
          >
            No projects found. Try searching for something else!
          </div>
        )}

        {/* Project Details Modal */}
        {/* Project Details Modal */}
        {/* ================== Project Details Section ================== */}
        {selectedProject && (
          <div className="fixed inset-0 bg-white overflow-y-auto z-50">
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-6 top-6 text-gray-600 text-3xl hover:text-black z-50"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Main Section */}
            <main className="flex-1 bg-gray-50 py-10 min-h-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Project Image */}
                  <div className="border rounded-lg bg-white p-4 shadow-sm">
                    <img
                      src={selectedProject.imageURL}
                      alt={selectedProject.name}
                      className="rounded-lg w-full object-cover"
                    />
                  </div>

                  {/* Project Description */}
                  <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">
                      {selectedProject.name}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {selectedProject.description ||
                        "This project is a beautifully designed and highly functional solution, ideal for developers and businesses."}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      It comes with clean code, responsive layouts, and smooth
                      performance — perfect for college or professional
                      projects.
                    </p>
                  </div>

                  {/* Technical Details */}
                  <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">
                      Technical Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                      <p>
                        <strong>Last Update:</strong> 8 November 2025
                      </p>
                      <p>
                        <strong>High Resolution:</strong> Yes
                      </p>
                      <p>
                        <strong>Compatible Browsers:</strong> Chrome, Edge,
                        Safari, Firefox
                      </p>
                      <p>
                        <strong>Framework:</strong> React 19
                      </p>
                      <p>
                        <strong>Files Included:</strong> HTML, CSS, JS
                      </p>
                      <p>
                        <strong>Layout:</strong> Responsive
                      </p>
                      <p>
                        <strong>Documentation:</strong> Well Documented
                      </p>
                      {selectedProject.technologies?.length > 0 && (
                        <p>
                          <strong>Technologies:</strong>{" "}
                          {selectedProject.technologies.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Related Projects */}
                  <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">
                      Related Projects
                    </h3>
                    <div className="flex gap-5 overflow-x-auto pb-2">
                      {relatedProjects.length === 0 && (
                        <span className="text-gray-400">
                          No related projects found.
                        </span>
                      )}
                      {relatedProjects.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setSelectedProject(p)}
                          className="min-w-[190px] bg-gray-50 hover:bg-accent/20 rounded-xl shadow transition cursor-pointer p-3"
                        >
                          <img
                            src={p.imageURL}
                            alt={p.name}
                            className="h-28 w-full object-cover rounded mb-2"
                          />
                          <div className="font-medium">{p.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                  {/* Pricing Card */}
                  <div className="bg-white border rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold">Regular License</h3>
                      <FaRegHeart className="text-gray-500 text-xl cursor-pointer" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      ₹{selectedProject.price || "—"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Quality checked by CodeForYou
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        className="flex-1 bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
                        onClick={openRequestModal}
                      >
                        <FaShoppingCart className="inline-block mr-2" />
                        Request This Project
                      </button>

                      <button
                        className="flex-1 border border-black py-2 rounded-md font-semibold hover:bg-gray-100 transition"
                        onClick={() => {
                          // Parses liveDemoURL to extract project folder name
                          const projectFolder =
                            selectedProject.liveDemoURL?.split("/")[2];
                          if (projectFolder) {
                            navigate(`/preview/${projectFolder}`);
                          } else {
                            // fallback or show error
                            Swal.fire({
                              icon: "error",
                              title: "Preview Unavailable",
                              text: "Live preview is not available for this project.",
                            });
                          }
                        }}
                      >
                        Live Preview
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      Includes 6 months of support
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="bg-white border rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold mb-3">Highlights</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" /> Modern UI
                        with Tailwind CSS v4
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" /> React 19
                        Support
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" /> Fully
                        Responsive Design
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" /> Clean
                        Documentation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </main>
          </div>
        )}

        {/* Request Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[99]">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-2 relative border-2 border-accent">
              <button
                className="absolute right-5 top-5 text-2xl text-gray-400 hover:text-black"
                onClick={closeRequestModal}
                aria-label="Close"
              >
                ×
              </button>
              <div className="p-7">
                <h2 className="text-2xl font-bold text-center mb-3 text-accent">
                  Request for{" "}
                  <span className="text-black">{selectedProject?.name}</span>
                </h2>
                <p className="text-center text-gray-500 mb-6">
                  Share your contact details & requirements. Our team will
                  connect within 24 hours!
                </p>
                {requestSuccess ? (
                  <div className="text-green-600 text-center py-8 font-semibold text-lg flex items-center justify-center gap-2">
                    <FaHeart className="text-green-700 text-2xl" />
                    Request sent! We'll contact you soon.
                  </div>
                ) : (
                  <form
                    onSubmit={handleRequestFormSubmit}
                    className="grid gap-4"
                  >
                    <input
                      name="name"
                      required
                      type="text"
                      value={requestForm.name}
                      onChange={handleRequestFormChange}
                      placeholder="Your Name"
                      className="w-full border border-accent px-4 py-2 rounded focus:ring-2 focus:ring-accent outline-none"
                    />
                    <input
                      name="email"
                      required
                      type="email"
                      value={requestForm.email}
                      onChange={handleRequestFormChange}
                      placeholder="Your Email"
                      className="w-full border border-accent px-4 py-2 rounded focus:ring-2 focus:ring-accent outline-none"
                    />
                    <input
                      name="phone"
                      type="text"
                      value={requestForm.phone}
                      onChange={handleRequestFormChange}
                      placeholder="Your Phone (optional)"
                      className="w-full border border-accent px-4 py-2 rounded focus:ring-2 focus:ring-accent outline-none"
                    />
                    <textarea
                      name="message"
                      value={requestForm.message}
                      onChange={handleRequestFormChange}
                      placeholder="Describe requirements, goals, deadline, etc"
                      rows={3}
                      className="w-full border border-accent px-4 py-2 rounded focus:ring-2 focus:ring-accent outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-accent text-white font-bold rounded-full py-3 mt-2 hover:bg-green-700 transition"
                    >
                      Send Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-12 pb-6 border-t border-border mt-8 text-center text-brandLight text-sm border-t border-brandLight pt-4">
        <div>© 2025 CodeForYou. All rights reserved.</div>
      </footer>
    </div>
  );
}
