import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { FaUserCircle, FaSignOutAlt, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

// Firebase setup
const auth = getAuth(app);
const db = getFirestore(app);

const hireOptions = [
  {
    id: "collaborate",
    title: "Collaborate with Us",
    description:
      "Join hands with CodeForYou to build innovative projects and solutions. Collaborate for mutual growth and success.",
  },
  {
    id: "requestProject",
    title: "Request a Custom Project",
    description:
      "Need a custom-built project or template? Tell us your requirements and we'll create tailored solutions for you.",
  },
  {
    id: "hireUs",
    title: "Hire Developers / Team",
    description:
      "Looking for skilled React, Tailwind, or AI developers? Hire our experts for short or long-term contracts.",
  },
  {
    id: "consultation",
    title: "Book a Consultation",
    description:
      "Need guidance with performance, architecture, or strategy? Schedule a consultation with our experts.",
  },
];

const HirePage = () => {
  const [selected, setSelected] = useState(hireOptions[0].id);
  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    company: "",
    timeline: "",
    status: "pending",
  });

  const currentOption = hireOptions.find((opt) => opt.id === selected);

  // User session
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
            email: data.email || loggedUser.email,
          });
          setFormData((prev) => ({
            ...prev,
            name: data.name || loggedUser.displayName || "",
            email: data.email || loggedUser.email || "",
          }));
        } else {
          setUser({
            uid: loggedUser.uid,
            name: loggedUser.displayName || "User",
            email: loggedUser.email,
          });
          setFormData((prev) => ({
            ...prev,
            name: loggedUser.displayName || "",
            email: loggedUser.email || "",
          }));
        }
      } else {
        setUser(null);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
          company: "",
          timeline: "",
          status: "pending",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    navigate("/");
  };

  const handleBackHome = () => {
    navigate(user ? "/userdashboard" : "/");
  };

  const toggleProfileMenu = () => setProfileOpen(!profileOpen);
  const toggleEditMode = () => setEditMode(!editMode);

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submit handler with Firebase and SweetAlert
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      // Save to Firestore
      await addDoc(collection(db, "hireRequests"), {
        userId: user?.uid || null,
        type: selected,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        subject: formData.subject,
        message: formData.message,
        company: formData.company || "",
        timeline: formData.timeline || "",
        createdAt: serverTimestamp(),
        status: "pending",
      });

      // Success alert with SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Request Submitted Successfully!",
        text: "Thank you for contacting us. Our team will get back to you within 48 hours.",
        confirmButtonColor: "#000000",
        confirmButtonText: "OK",
      });

      // Reset form
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        mobile: "",
        subject: "",
        message: "",
        company: "",
        timeline: "",
        status: "pending",
      });

      setTimeout(() => setSubmitted(false), 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Error alert
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#000000",
      });
      
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* HEADER */}
      <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="CodeForYou logo" className="h-8 w-auto" />
            <span className="font-bold text-xl">&lt;CodeForYou/&gt;</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleBackHome}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 font-semibold transition"
            >
              Back to Home
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center gap-2 text-gray-700 hover:text-black"
                >
                  <FaUserCircle size={26} />
                  <span className="hidden sm:inline">Hi, {user.name}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm z-50">
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
                            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex justify-center items-center"
                          >
                            <FaEdit className="mr-2" /> Edit Profile
                          </button>
                          <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white py-2 rounded hover:bg-red-700 flex justify-center items-center"
                          >
                            <FaSignOutAlt className="mr-2" /> Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <form className="space-y-3 text-sm">
                        <input
                          type="text"
                          value={user.name}
                          onChange={() => {}}
                          className="w-full border rounded px-2 py-1"
                        />
                        <input
                          type="email"
                          value={user.email}
                          onChange={() => {}}
                          className="w-full border rounded px-2 py-1"
                        />
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-gray-300 rounded px-3 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-blue-600 text-white rounded px-3 py-1"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="text-gray-700 hover:text-black font-medium">
                  Sign in
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-black font-medium">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-white border-b border-gray-200 py-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold mb-2 text-gray-900">Hire Us</h1>
          <p className="text-gray-600 text-lg">
            Partner with CodeForYou for innovative web development solutions tailored to your needs.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="flex flex-col md:flex-row max-w-7xl mx-auto w-full px-6 py-10 gap-6">
        {/* Sidebar */}
        <aside className="md:w-72 bg-white rounded-lg shadow p-6 h-max md:sticky md:top-24">
          <ul className="space-y-3">
            {hireOptions.map((opt) => (
              <li key={opt.id}>
                <button
                  onClick={() => setSelected(opt.id)}
                  className={`w-full text-left px-4 py-2 rounded-md font-medium transition ${
                    selected === opt.id
                      ? "bg-black text-white shadow"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {opt.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Area */}
        <section className="flex-1 bg-white rounded-lg shadow p-6 overflow-auto">
          <h2 className="text-2xl font-semibold mb-2">{currentOption?.title}</h2>
          <p className="text-gray-600 mb-6">{currentOption?.description}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-sm">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {(selected === "hireUs" || selected === "collaborate") && (
              <div>
                <label className="block mb-1 font-semibold text-sm">Company / Organization</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name (optional)"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            )}

            {selected === "hireUs" && (
              <div>
                <label className="block mb-1 font-semibold text-sm">Timeline</label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="E.g., 3 months contract"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block mb-1 font-semibold text-sm">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject / Project title"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-sm">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder={
                  {
                    collaborate: "Tell us about your collaboration idea or proposal...",
                    requestProject: "Describe your project requirements, goals, and desired features...",
                    hireUs: "Mention what kind of developers or team you need, and for how long...",
                    consultation: "Describe the topic or issue you'd like to discuss during the consultation...",
                  }[selected] || "Write your message..."
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {submitted ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-gray-200 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold">CodeForYou</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default HirePage;
