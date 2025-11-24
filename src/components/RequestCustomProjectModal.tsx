import React, { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
const auth = getAuth();

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  requirements: "",
  budget: "",
  timeline: "",
  projectType: "",
};

const RequestCustomProjectModal = ({
  open,
  onClose,
  projectType,
}: {
  open: boolean;
  onClose: () => void;
  projectType: string;
}) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm((prev) => ({ ...initialForm, projectType }));
    }
  }, [open, projectType]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildFirestoreData = () => {
    const user = auth.currentUser;
    return {
      name: form.name,
      email: form.email,
      mobile: form.phone,
      company: form.company,
      message: form.requirements,
      projectId: "",
      projectCategory: "",
      subject:
        form.projectType === "student"
          ? "Student Project Request"
          : form.projectType === "business"
          ? "Startup/Business Request"
          : "Custom Project Request",
      timeline: form.timeline,
      status: "pending",
      type: "projectRequest",
      budget: form.budget,
      createdAt: serverTimestamp(),
      userId: user?.uid || "",
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "hireRequests"), buildFirestoreData());
      Swal.fire({
        icon: "success",
        title: "Request Sent!",
        text: "Thank you. Our team will contact you within 24 hours.",
        confirmButtonColor: "#4F46E5",
      });
      setForm(initialForm);
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Could not send your request. Please try again.",
        confirmButtonColor: "#4F46E5",
      });
    }
  };

  if (!open) return null;

  const modalTitle =
    form.projectType === "student"
      ? "Student Project Request"
      : form.projectType === "business"
      ? "Startup/Business Request"
      : "Custom Project Request";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-7 relative animate-slideUp border border-gray-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close modal"
        >
          <span className="text-3xl leading-none">&times;</span>
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center mb-4 text-gray-900">
          {modalTitle}
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Please fill in the details below. We will contact you shortly.
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
              autoComplete="name"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
              autoComplete="email"
              placeholder="your-email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="+1234567890"
              autoComplete="tel"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-1"
              htmlFor="company"
            >
              Company / Institute
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Your company or institute name"
              autoComplete="organization"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-1"
              htmlFor="requirements"
            >
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="requirements"
              name="requirements"
              rows={3}
              value={form.requirements}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Describe your project or requirement in detail"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-transform active:scale-95"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProjectRequestButtons = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const openModal = (type: string) => {
    setSelectedType(type);
    setModalOpen(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <div className="flex justify-center space-x-6">
        <button
          onClick={() => openModal("student")}
          className="px-6 py-3 bg-black hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
        >
          Student Project Request
        </button>
        <button
          onClick={() => openModal("business")}
          className="px-6 py-3 bg-black hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 transition"
        >
          Startup/Business Request
        </button>
      </div>

      <RequestCustomProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        projectType={selectedType}
      />
    </div>
  );
};

export default ProjectRequestButtons;
