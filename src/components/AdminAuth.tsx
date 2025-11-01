import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

export default function AdminAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For register
  const [confirmPassword, setConfirmPassword] = useState(""); // For register
  const [loading, setLoading] = useState(false);

  // --------- LOGIN ---------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const docRef = doc(db, "users", userCredential.user.uid);
      const userSnap = await getDoc(docRef);

      if (!userSnap.exists()) {
        Swal.fire("Error", "No account data found for this admin!", "error");
        setLoading(false);
        return;
      }
      const userData = userSnap.data();
      if (userData.role === "admin") {
        Swal.fire("Welcome Admin!", "Redirecting to Admin Dashboard...", "success");
        navigate("/AdminPanel");
      } else {
        Swal.fire("Access Denied", "You don't have admin privileges!", "error");
        navigate("/userdashboard");
      }
    } catch (error: any) {
      Swal.fire("Login Failed", error.message, "error");
    }
    setLoading(false);
  };

  // --------- REGISTER ---------
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      setLoading(false);
      return;
    }

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        name,
        role: "admin",
        createdAt: new Date(),
      });

      Swal.fire("Success", "Admin account created!", "success");
      navigate("/admin");
    } catch (error: any) {
      Swal.fire("Registration Failed", error.message, "error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="CodeForYou" className="h-12 mb-3" />
          <h1 className="text-2xl font-bold">{isLogin ? "Admin Login" : "Admin Register"}</h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            {isLogin
              ? "Sign in with your authorized admin email to access the dashboard."
              : "Register a new admin account. Only trusted users should use this!"}
          </p>
        </div>
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black"
                placeholder="admin@codeforyou.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-semibold py-3 rounded hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="mt-6 text-center text-mutedText text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-black hover:text-gray-600 font-semibold"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black"
                placeholder="Admin name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black"
                placeholder="admin@codeforyou.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black"
                placeholder="Set password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black"
                placeholder="Confirm password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-semibold py-3 rounded hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="mt-6 text-center text-mutedText text-sm">
              Already registered?{" "}
              <button
                type="button"
                className="text-black hover:text-gray-600 font-semibold"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
