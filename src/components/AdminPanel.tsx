import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import {
  FaUsers,
  FaClipboardList,
  FaEye,
  FaProjectDiagram,
  FaShoppingCart,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaPlus,
  FaUserCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";

const auth = getAuth(app);
const db = getFirestore(app);

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: any;
}

interface HireRequest {
  id: string;
  userId: string;
  type: string;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  company?: string;
  timeline?: string;
  status: string;
  createdAt: any;
}

interface Project {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  category: string;
  rating: number;
  repoURL: string;
  status: string;
  technologies: string[];
  liveDemoURL: string;
  featured: boolean;
  createdAt: any;
  updatedAt?: any;
  soldBy?: string;
}


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<HireRequest[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [webVisits, setWebVisits] = useState(0);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          if (userData.role === "admin") {
            setAdmin(userData);
            fetchAllData();
            return;
          }
        }
        Swal.fire("Access Denied", "Admin access only.", "error");
        signOut(auth);
        navigate("/signin");
      } else {
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const usersSnap = await getDocs(collection(db, "users"));
      const usersData = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
      setUsers(usersData);

      const requestsSnap = await getDocs(query(collection(db, "hireRequests"), orderBy("createdAt", "desc")));
      const requestsData = requestsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as HireRequest[];
      setRequests(requestsData);

      const projectsSnap = await getDocs(collection(db, "projects"));
      const projectsData = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
      setProjects(projectsData);

      setWebVisits(1247);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Failed to load dashboard data", "error");
    }
    setLoading(false);
  };

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "hireRequests", requestId), { status: newStatus });
      Swal.fire("Updated!", `Request status changed to ${newStatus}`, "success");
      fetchAllData();
    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const deleteRequest = async (requestId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "hireRequests", requestId));
        Swal.fire("Deleted!", "Request has been deleted.", "success");
        fetchAllData();
      } catch {
        Swal.fire("Error", "Failed to delete request", "error");
      }
    }
  };

  const addProject = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Project",
      html: `
        <input id="name" class="swal2-input" placeholder="Project Name">
        <textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>
        <input id="category" class="swal2-input" placeholder="Category">
        <input id="price" class="swal2-input" type="number" placeholder="Price">
        <input id="imageURL" class="swal2-input" placeholder="Image URL">
        <input id="liveDemoURL" class="swal2-input" placeholder="Live Demo URL (optional)">
        <input id="repoURL" class="swal2-input" placeholder="Repo URL (optional)">
        <select id="status" class="swal2-select">
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Inactive">Inactive</option>
        </select>
        <label style="display:flex; align-items:center; gap:0.5em; margin-top:0.5em;">
          <input type="checkbox" id="featured" />
          Featured
        </label>
        <input id="rating" type="number" min="0" max="5" step="0.1" class="swal2-input" placeholder="Rating (0-5)">
        <input id="technologies" class="swal2-input" placeholder="Technologies (comma separated)">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const featuredCheckbox = document.getElementById("featured") as HTMLInputElement;
        const techsInput = (document.getElementById("technologies") as HTMLInputElement).value;
        return {
          name: (document.getElementById("name") as HTMLInputElement).value.trim(),
          description: (document.getElementById("description") as HTMLTextAreaElement).value.trim(),
          category: (document.getElementById("category") as HTMLInputElement).value.trim(),
          price: Number((document.getElementById("price") as HTMLInputElement).value),
          imageURL: (document.getElementById("imageURL") as HTMLInputElement).value.trim(),
          liveDemoURL: (document.getElementById("liveDemoURL") as HTMLInputElement).value.trim(),
          repoURL: (document.getElementById("repoURL") as HTMLInputElement).value.trim(),
          status: (document.getElementById("status") as HTMLSelectElement).value,
          rating: Number((document.getElementById("rating") as HTMLInputElement).value),
          featured: featuredCheckbox.checked,
          technologies: techsInput.split(",").map(t => t.trim()).filter(Boolean),
          createdAt: serverTimestamp(),
        };
      }
    });

    if (formValues) {
      try {
        await addDoc(collection(db, "projects"), formValues);
        Swal.fire("Success!", "Project added successfully", "success");
        fetchAllData();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to add project", "error");
      }
    }
  };

  const deleteProject = async (projectId: string) => {
    const result = await Swal.fire({
      title: "Delete Project?",
      text: "This will permanently remove the project",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "projects", projectId));
        Swal.fire("Deleted!", "Project has been removed.", "success");
        fetchAllData();
      } catch (error) {
        Swal.fire("Error", "Failed to delete project", "error");
      }
    }
  };

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-8" />
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">CodeForYou Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaUserCircle size={24} className="text-gray-600" />
              <span className="text-sm font-medium">{admin?.email}</span>
              <span className="ml-2 text-gray-400 text-xs">({admin?.name})</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h3 className="text-3xl font-bold mt-1">{users.length}</h3>
          </div>
          <FaUsers className="text-blue-500 text-4xl" />
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Hire Requests</p>
            <h3 className="text-3xl font-bold mt-1">{requests.length}</h3>
          </div>
          <FaClipboardList className="text-yellow-500 text-4xl" />
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Web Visits</p>
            <h3 className="text-3xl font-bold mt-1">{webVisits}</h3>
          </div>
          <FaEye className="text-green-500 text-4xl" />
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Projects</p>
            <h3 className="text-3xl font-bold mt-1">{projects.length}</h3>
          </div>
          <FaProjectDiagram className="text-purple-500 text-4xl" />
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Projects Sold</p>
            <h3 className="text-3xl font-bold mt-1">
              {projects.filter(p => p.soldBy).length}
            </h3>
          </div>
          <FaShoppingCart className="text-red-500 text-4xl" />
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-6 py-4 bg-white rounded-lg shadow">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {["overview", "users", "requests", "projects"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize px-6 py-3 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>


                    <div className="p-6">
            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{user.name}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">{user.phone || "N/A"}</td>
                          <td className="px-4 py-3 capitalize">{user.role}</td>
                          <td className="px-4 py-3">
                            {user.createdAt?.toDate?.().toLocaleDateString() || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === "requests" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Hire Requests</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Subject</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map(req => (
                        <tr key={req.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{req.name}</td>
                          <td className="px-4 py-3 capitalize">{req.type}</td>
                          <td className="px-4 py-3">{req.subject}</td>
                          <td className="px-4 py-3">
                            <select
                              value={req.status}
                              onChange={(e) => updateRequestStatus(req.id, e.target.value)}
                              className="border rounded px-2 py-1 text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => deleteRequest(req.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Projects</h2>
      <button
        onClick={addProject}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        <FaPlus /> Add Project
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Featured</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Rating</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{project.name}</td>
              <td className="px-4 py-3">{project.category}</td>
              <td className="px-4 py-3">₹{project.price}</td>
              <td className="px-4 py-3">
                {project.featured ? (
                  <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                  "No"
                )}
              </td>
              <td className="px-4 py-3 capitalize">{project.status}</td>
              <td className="px-4 py-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < project.rating ? "text-yellow-400" : "text-gray-300"}
                  >
                    &#9733;
                  </span>
                ))}
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}


            {/* Overview Tab */}
            {activeTab === "overview" && (
  <div>
    <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {/* Recent Users */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-2">Recent Users</h3>
        <ul className="space-y-2">
          {users.filter(u => u.role === "user").slice(0, 5).map(user => (
            <li key={user.id} className="text-sm">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
      {/* Admins List & Add Admin */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Admin Team</h3>
          <button
            onClick={async () => {
              const { value: form } = await Swal.fire({
                title: "Add New Admin",
                html:
                  `<input id="swal-admin-name" class="swal2-input" placeholder="Full Name" />
                   <input id="swal-admin-email" class="swal2-input" placeholder="Email" type="email" />
                   <input id="swal-admin-pass" class="swal2-input" placeholder="Password" type="password" />
                   <input id="swal-admin-cpass" class="swal2-input" placeholder="Confirm Password" type="password" />`,
                showCancelButton: true,
                preConfirm: async () => {
                  const name = (document.getElementById('swal-admin-name') as HTMLInputElement).value;
                  const email = (document.getElementById('swal-admin-email') as HTMLInputElement).value;
                  const password = (document.getElementById('swal-admin-pass') as HTMLInputElement).value;
                  const cpass = (document.getElementById('swal-admin-cpass') as HTMLInputElement).value;
                  if (!name || !email || !password) {
                    Swal.showValidationMessage('Please fill in all the fields.');
                    return;
                  }
                  if (password !== cpass) {
                    Swal.showValidationMessage('Passwords do not match!');
                    return;
                  }
                  return { name, email, password };
                }
              });
              // Create new admin in Auth and Firestore
              if (form) {
                try {
                  // Create with Firebase Auth REST API to avoid replacing current session
                  const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: form.email,
                      password: form.password,
                      returnSecureToken: false
                    }),
                  });
                  const data = await resp.json();
                  if (data.error) throw new Error(data.error.message);
                  // The newly created user's UID is not directly available — you must sync via your admin panel/tools.
                  // For this interface, prompt you to manually ensure setup in production.
                  Swal.fire("Success!", "Admin created. Set role manually if needed.", "success");
                } catch (err: any) {
                  Swal.fire("Error", err.message || "Failed to create admin user", "error");
                }
              }
            }}
            className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition text-xs"
          >
            + Add Admin
          </button>
        </div>
        <ul className="space-y-2">
          {users.filter(u => u.role === "admin").map(admin => (
            <li key={admin.id} className="text-sm font-semibold">
              {admin.name} - {admin.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}

          </div>
      </section>
    </div>
  );
};

export default AdminDashboard;


