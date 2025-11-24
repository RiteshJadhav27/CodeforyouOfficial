import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaSignOutAlt,
  FaUserCircle,
  FaHeart,
  FaBox,
  FaClipboardList,
  FaSave,
  FaHome,
  FaCode,
  FaPaperPlane,
} from "react-icons/fa";
import projectsData from "../data/projects.json";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const db = getFirestore(app);
const auth = getAuth(app);

const tabs = [
  { key: "profile-info", label: "Profile Info", icon: <FaUserCircle /> },
  { key: "wishlist", label: "Wishlist", icon: <FaHeart /> },
  { key: "orders", label: "Orders", icon: <FaBox /> },
  { key: "requests", label: "Requests / Responses", icon: <FaClipboardList /> },
];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile-info");
  const [userData, setUserData] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [busyProjects, setBusyProjects] = useState<any[]>([]);
  const [requestLoading, setRequestLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch user and wishlist from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          setUserData(data);
          setWishlist(data.wishlist || []);
          setBusyProjects(data.busyproject || []);
        } else {
          setUserData({
            name: user.displayName || "",
            email: user.email,
            phone: "",
            createdAt: user.metadata.creationTime,
          });
          setWishlist([]);
          setBusyProjects([]);
        }
      } else {
        navigate("/signin");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      name: userData.name,
      phone: userData.phone,
    });
    setEditMode(false);
  };

  // Wishlist handling (remove/add item then update in Firestore and UI)
  const toggleWishlist = async (projectId: string) => {
    if (!auth.currentUser) return;
    let newWishlist;
    if (wishlist.includes(projectId)) {
      newWishlist = wishlist.filter((id) => id !== projectId);
    } else {
      newWishlist = [...wishlist, projectId];
    }
    setWishlist(newWishlist); // update UI immediately
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, { wishlist: newWishlist });
  };

  // Request Project from wishlist (add to busyproject array in Firestore)
  const handleRequestProject = async (projectId: string) => {
    if (!auth.currentUser || !userData) return;
    setRequestLoading(true);
    const userRef = doc(db, "users", auth.currentUser.uid);
    const newRequest = {
      name: userData.name,
      mobile: userData.phone || "",
      email: userData.email,
      projectId,
      requestedAt: new Date().toISOString(),
    };
    await updateDoc(userRef, {
      busyproject: arrayUnion(newRequest),
    });
    // Locally update busyProjects array after request
    setBusyProjects((prev) => [...prev, newRequest]);
    setRequestLoading(false);
    alert("Request sent and saved to your database!");
  };

  const wishlistProjects = projectsData.filter((p) => wishlist.includes(p.id));

  // Fetch project details for busyProjects requests
  const busyProjectDetails = busyProjects.map((request) => {
    const project = projectsData.find((p) => p.id === request.projectId);
    return project
      ? { ...request, ...project }
      : { ...request, name: "Unknown Project" };
  });

  if (loading)
    return (
      <div className="p-10 text-white text-center">Loading profile...</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 relative">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-6 py-4 gap-4">
          {/* Left - Brand */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="CodeForYou" className="h-6 w-auto" />
            <span className="font-mono font-bold text-lg text-black">
              &lt;CodeForYou/&gt;
            </span>
          </div>
          {/* Center - Title */}
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-gray-800">
            <FaCode className="text-black" />
            Profile Dashboard
          </h1>
          {/* Right - Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/project")}
              className="flex items-center font-semibold px-4 py-2"
            >
              Projects
            </button>
            <button
              onClick={() => navigate("/userdashboard")}
              className="flex items-center gap-2 text-black px-4 py-2 rounded-md"
            >
              <FaHome /> Home
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-8 px-6 pb-20">
        {/* Sidebar */}
        <aside className="bg-white shadow-lg rounded-2xl w-full md:w-1/4 p-6">
          <div className="flex flex-col items-center text-center mb-8">
            <FaUserCircle className="text-gray-400 text-7xl mb-3" />
            <h2 className="text-xl font-semibold">{userData?.name}</h2>
            <p className="text-gray-500 text-sm">{userData?.email}</p>
          </div>
          <nav className="flex flex-col space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left font-medium transition ${
                  activeTab === tab.key
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
          {/* CodeForYou Watermark */}
          <div className="absolute bottom-3 right-4 text-xs text-gray-400 italic select-none pointer-events-none">
            Powered by{" "}
            <span className="text-black font-semibold">
              &lt;CodeForYou/&gt;
            </span>{" "}
            🚀
          </div>

          {/* Profile Info Tab */}
          {activeTab === "profile-info" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Information</h2>
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    <FaSave /> Save
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData?.name || ""}
                    disabled={!editMode}
                    onChange={(e) =>
                      setUserData((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className={`w-full border px-4 py-2 rounded-md ${
                      editMode ? "bg-white" : "bg-gray-100"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData?.email || ""}
                    disabled
                    className="w-full border px-4 py-2 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={userData?.phone || ""}
                    disabled={!editMode}
                    onChange={(e) =>
                      setUserData((prev: any) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className={`w-full border px-4 py-2 rounded-md ${
                      editMode ? "bg-white" : "bg-gray-100"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Member Since
                  </label>
                  <input
                    type="text"
                    value={
                      userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString()
                        : "N/A"
                    }
                    disabled
                    className="w-full border px-4 py-2 rounded-md bg-gray-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <main>
              {wishlistProjects.length === 0 ? (
                <div className="text-center text-gray-500 py-20">
                  <FaHeart className="text-5xl mx-auto mb-4 text-red-400" />
                  <p>No items in your wishlist yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {wishlistProjects.map((project) => (
                    <article
                      key={project.id}
                      className="bg-white rounded-lg shadow p-5 flex flex-col justify-between"
                    >
                      <img
                        src={project.imageURL}
                        alt={project.name}
                        className="rounded mb-3 h-40 w-full object-cover"
                      />
                      <h3 className="text-lg font-semibold mb-1">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {project.description}
                      </p>
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => toggleWishlist(project.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
                          aria-label={`Remove ${project.name} from wishlist`}
                        >
                          <FaHeart /> Remove
                        </button>
                        <button
                          onClick={() => handleRequestProject(project.id)}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded transition font-medium ml-2"
                          disabled={requestLoading}
                        >
                          <FaPaperPlane />
                          Request Project
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </main>
          )}

          {/* Orders Tab (same as before) */}
          {activeTab === "orders" && (
            <div className="text-center text-gray-500 py-20">
              <FaBox className="text-5xl mx-auto mb-4 text-gray-400" />
              <p>You haven’t placed any orders yet.</p>
            </div>
          )}

          {/* Requests Tab - show busyProjects */}
          {activeTab === "requests" && (
            <main>
              {busyProjectDetails.length === 0 ? (
                <div className="text-center text-gray-500 py-20">
                  <FaClipboardList className="text-5xl mx-auto mb-4 text-gray-400" />
                  <p>No requests or responses found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
                  {busyProjectDetails.map((req, idx) => (
                    <article
                      key={req.projectId + "_" + idx}
                      className="bg-white rounded-lg shadow p-5"
                    >
                      <h3 className="text-lg font-bold mb-2">{req.name}</h3>
                      <p className="text-gray-700 text-sm mb-1">
                        <b>Project ID:</b> {req.projectId}
                      </p>
                      <p className="text-gray-600 text-xs mb-1">
                        <b>Requested At:</b>{" "}
                        {req.requestedAt
                          ? new Date(req.requestedAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p className="text-gray-600 text-xs mb-1">
                        <b>Name:</b> {req.name}
                      </p>
                      <p className="text-gray-600 text-xs mb-1">
                        <b>Mobile:</b> {req.mobile}
                      </p>
                      <p className="text-gray-600 text-xs mb-1">
                        <b>Email:</b> {req.email}
                      </p>
                      <p className="text-gray-600 text-xs mt-2">
                        <b>Description:</b> {req.description || ""}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </main>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
