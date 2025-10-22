'use client';
import React, { useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


// Dummy project data for illustration
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
    desc: "Tourism safety dashboard with realtime risk scoring and geofencing.",
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
  // ...add more projects here
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter(
    project =>
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.desc.toLowerCase().includes(search.toLowerCase()) ||
      project.tag.toLowerCase().includes(search.toLowerCase())
  );

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
          <Link to="/" className="text-gray-700 hover:text-black font-medium">
            Home
          </Link>
          <Link to="/signin" className="text-gray-700 hover:text-black font-medium">
            Sign in
          </Link>
          <Link to="/signup" className="text-gray-700 hover:text-black font-medium">
            Sign up
          </Link>
          <Link
            to="/hire"
            className="ml-2 bg-black hover:bg-gray-800 text-white font-bold rounded px-5 py-2 transition shadow"
          >
            Hire us
          </Link>
        </nav>

        
        </div>
      </header>
    <div className="min-h-screen bg-background text-text pb-20">

      {/* Page Header */}
      <section className="bg-surface border-b border-border py-12 mb-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold mb-2 text-text">
            Our Projects
          </h1>
          <p className="text-mutedText text-lg mb-4">
            Discover innovative web projects and templates built by the CodeForYou team.  
            Explore, learn, and get inspired!
          </p>
          <div className="flex items-center max-w-md mx-auto mt-6 bg-accent rounded-full px-2 py-1 border border-border">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-accent text-text px-4 py-2 w-full rounded-l-full focus:outline-none"
              placeholder="Search projects..."
            />
            <button
              className="bg-text text-background px-5 py-2 rounded-full font-semibold hover:bg-mutedText transition"
              disabled
            >
              Search
            </button>
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-surface rounded-2xl shadow-lg hover:shadow-2xl border border-border transition-transform hover:-translate-y-2 flex flex-col">
              <img
                src={project.img}
                alt={project.name}
                className="rounded-t-2xl object-cover h-44 w-full"
              />
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-xl font-bold text-text mb-2">{project.name}</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-text font-medium text-xs mb-3">
                  {project.tag}
                </span>
                <p className="text-mutedText mb-4 flex-1">{project.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className={`px-3 py-1 rounded-full font-semibold text-xs ${project.status === "Active"
                    ? "bg-background text-text"
                    : "bg-mutedText text-background"
                  }`}>
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
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center text-mutedText py-24 text-lg">
            No projects found. Try searching different terms!
          </div>
        )}
      </section>
    </div>
    </div>
  );
}
