import React, { useState } from "react";
import logo from '../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";

const hireOptions = [
  {
    id: "collaborate",
    title: "Collaborate with Us",
    description:
      "Join hands with CodeForYou to build innovative projects and solutions. Collaborate for mutual growth and success.",
    details: (
      <>
        <p>We offer partnerships on research, development, and marketing initiatives.</p>
        <p className="mt-2">
          Contact us to discuss collaboration projects and share your ideas.
        </p>
      </>
    ),
  },
  {
    id: "requestProject",
    title: "Request for Project",
    description:
      "Need a custom web project? Let us know your requirements and we will build tailored solutions for you.",
    details: (
      <>
        <form className="mt-4 space-y-4">
          <div>
            <label className="block mb-1 text-text font-semibold">Project Title</label>
            <input
              type="text"
              placeholder="Enter your project title"
              className="w-full rounded border border-border px-3 py-2 focus:ring-2 focus:ring-accent bg-surface text-text"
            />
          </div>
          <div>
            <label className="block mb-1 text-text font-semibold">Description</label>
            <textarea
              rows={4}
              placeholder="Describe your project requirements"
              className="w-full rounded border border-border px-3 py-2 focus:ring-2 focus:ring-accent bg-surface text-text"
            />
          </div>
          <button
            type="submit"
            className="bg-text text-background font-semibold rounded px-4 py-2 hover:bg-mutedText transition"
          >
            Submit Request
          </button>
        </form>
      </>
    ),
  },
  {
    id: "hireUs",
    title: "Hire Us",
    description:
      "Looking to hire developers or teams? We provide expert developers for your project needs.",
    details: (
      <>
        <p>
          Hire individual developers or full teams on short or long-term contracts.
        </p>
        <p className="mt-2">
          Let us know your needs and timeline, and we will provide the best matches.
        </p>
      </>
    ),
  },
  {
    id: "consultation",
    title: "Consultation",
    description:
      "Get professional consultation to optimize your web projects, performance, and architectures.",
    details: (
      <>
        <p>Our experts will review your project and provide actionable insights.</p>
        <p className="mt-2">Book a consultation session to accelerate your success.</p>
      </>
    ),
  },
];

const HirePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(hireOptions[0].id);
  const navigate = useNavigate();

  const currentOption = hireOptions.find((opt) => opt.id === selected);

  return (
    <div className="min-h-screen bg-background text-text pt-12 md:pt-0">
      {/* HEADER */}
      <header className="w-full bg-white shadow border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo and brand */}
          <div className="flex flex-col items-center gap-0">
            <img src={logo} alt="CodeForYou logo" className="h-6 w-auto" />
            <span className="font-bold text-xl">&lt;CodeForYou/&gt;</span>
          </div>

          {/* Back to Home Link on right */}
          <Link
            to="/"
            className="absolute right-0 mt-2 w-48 bg-white z-50 font-bold"
          >
            Back to Home
          </Link>


        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Menu */}
        <aside className="md:w-64 bg-surface rounded-lg p-6 shadow fixed top-[5rem] md:top-28 left-4 md:left-auto z-30 md:sticky md:h-[calc(100vh-5rem)] overflow-auto">
          <nav>
            <ul className="space-y-4">
              {hireOptions.map((opt) => (
                <li key={opt.id}>
                  <button
                    onClick={() => setSelected(opt.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition 
                      ${selected === opt.id
                        ? "bg-accent font-bold text-text shadow"
                        : "hover:bg-accent hover:text-text text-mutedText"
                      }`}
                  >
                    {opt.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <section className="flex-1 bg-surface rounded-lg p-8 shadow md:ml-72 min-h-[400px]">
          <h2 className="text-3xl font-semibold mb-4">{currentOption?.title}</h2>
          <p className="mb-6 text-mutedText">{currentOption?.description}</p>
          <div className="prose max-w-none">{currentOption?.details}</div>
        </section>
      </main>
    </div>
  );
};

export default HirePage;
