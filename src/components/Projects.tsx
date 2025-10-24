'use client';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserCircle, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

// Dummy project data
const projects = [
  {
    id: 1,
    name: "SmartEye DR",
    desc: "AI-based diabetic retinopathy detection system for healthcare innovation.",
    img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=400&q=80",
    status: "Active",
    tag: "AI/Healthcare",
    link: "#",
  },
  {
    id: 2,
    name: "GeoGuardian Safety",
    desc: "Tourism safety dashboard with real-time risk scoring and geofencing.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
    status: "Completed",
    tag: "Tourism",
    link: "#",
  },
  {
    id: 3,
    name: "Portfolio Builder",
    desc: "Personal website template for students, creators and freelancers.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    status: "Active",
    tag: "Web/Portfolio",
    link: "#",
  },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Session persistence logic
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser) {
        const userDocRef = doc(db, "users", loggedUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUser({
            name: data.name || loggedUser.displayName || "User",
            email: data.email || loggedUser.email,
          });
        } else {
          setUser({
            name: loggedUser.displayName || "User",
            email: loggedUser.email,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    navigate("/");
  };

  const filteredProjects = projects.filter(
    project =>
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.desc.toLowerCase().includes(search.toLowerCase()) ||
      project.tag.toLowerCase().includes(search.toLowerCase())
  );

  const handleHomeClick = () => {
  if (user) {
    navigate("/userdashboard");
  } else {
    navigate("/");
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Navbar */}
      <header className="w-full bg-white shadow border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 flex-wrap">
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
                placeholder="Search themes…"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            </div>
          </div>

          {/* Dynamic Navbar */}
          <nav className="flex items-center gap-4 mt-3 md:mt-0">
           <button
  onClick={handleHomeClick}
  className="text-gray-700 hover:text-black font-medium"
>
  Home
</button>

            {!user ? (
              <>
                <Link to="/signin" className="text-gray-700 hover:text-black font-medium">
                  Sign in
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-black font-medium">
                  Sign up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-black font-medium focus:outline-none"
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
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input
                            type="text"
                            value={user.name}
                            onChange={() => {}}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            value={user.email}
                            onChange={() => {}}
                            className="w-full border border-gray-300 rounded px-3 py-2"
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
            Discover innovative web projects built by the CodeForYou team. Explore, learn, and get inspired!
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-surface rounded-2xl shadow-lg hover:shadow-2xl border border-border transition-transform hover:-translate-y-2 flex flex-col"
            >
              <img
                src={project.img}
                alt={project.name}
                className="rounded-t-2xl object-cover h-44 w-full"
              />
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-xl font-bold text-text mb-2">
                  {project.name}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-text font-medium text-xs mb-3">
                  {project.tag}
                </span>
                <p className="text-mutedText mb-4 flex-1">{project.desc}</p>
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
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-text text-background px-4 py-1 rounded-full font-bold hover:bg-mutedText transition text-sm"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center text-mutedText py-24 text-lg">
            No projects found. Try searching for something else!
          </div>
        )}
      </main>
    </div>
  );
}
