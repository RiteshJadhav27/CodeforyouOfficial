import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logow from "../assets/logow.png";
import Swal from "sweetalert2";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { db, app } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth(app);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Keep user on dashboard if session is active
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/userdashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Handle login/register
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (!isLogin) {
      // REGISTER
      const confirmPassword = (
        form.elements.namedItem("confirm_password") as HTMLInputElement
      ).value;
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const phone = (form.elements.namedItem("phone") as HTMLInputElement)
        .value;

      if (password !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match!", "error");
        return;
      }

      try {
        await setPersistence(auth, browserSessionPersistence);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Only create user with role "user"
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email,
          name,
          phone,
          role: "user",
          createdAt: new Date(),
        });

        Swal.fire("Success", "Account successfully created!", "success");
        navigate("/userdashboard");
      } catch (error: any) {
        Swal.fire("Error", error.message, "error");
      }
    } else {
      // LOGIN
      try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, password);

        Swal.fire("Welcome!", "Login successful!", "success");
        navigate("/userdashboard");
      } catch (error: any) {
        Swal.fire("Login failed", error.message, "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-text">
      {/* Left Visual Illustration */}
      <div
        className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${
            isLogin
              ? "https://images.unsplash.com/photo-1596495577886-d920f1e7380b?auto=format&fit=crop&w=800&q=80"
              : "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
          }')`,
        }}
      >
        <div className="flex flex-col items-center mb-8 -mt-10">
          <img
            src={isLogin ? logo : logow}
            alt="CodeForYou logo"
            className="h-16 w-auto mb-2"
          />
          <span
            className={`font-bold text-4xl tracking-wide ${
              isLogin ? "text-black" : "text-white"
            }`}
          >
            CodeForYou
          </span>
        </div>

        <div className="bg-black bg-opacity-90 p-10 rounded-lg max-w-lg text-white flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-6">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </h1>
          <p className="text-lg text-center">
            {isLogin
              ? "Join the community of innovators and start building your dream project website today."
              : "Start building and tracking your projects with the best tools available."}
          </p>
        </div>
      </div>

      {/* Login/Register Form Section */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-lg">
          {isLogin ? (
            <>
              <h2 className="text-center text-3xl font-extrabold text-text mb-6">
                Sign In to Your Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-mutedText">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-white text-text focus:ring-2 focus:ring-accent"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-mutedText">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-white text-text focus:ring-2 focus:ring-accent"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white font-semibold rounded-md py-3 hover:bg-gray-700 transition"
                >
                  Sign In
                </button>
                <p className="mt-6 text-center text-mutedText text-sm">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-black hover:text-gray-600 font-semibold"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-center text-3xl font-extrabold text-text mb-6">
                Create a New Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-mutedText">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-white text-text focus:ring-2 focus:ring-accent"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-mutedText">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-white text-text focus:ring-2 focus:ring-accent"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-mutedText">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-white text-text focus:ring-2 focus:ring-accent"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-mutedText">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-white text-text focus:ring-2 focus:ring-accent"
                    placeholder="Create a password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-mutedText">
                    Confirm Password
                  </label>
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-white text-text focus:ring-2 focus:ring-accent"
                    placeholder="Confirm password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white font-semibold rounded-md py-3 hover:bg-gray-700 transition "
                >
                  Sign Up
                </button>
                <p className="mt-6 text-center text-mutedText text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-black hover:text-gray-600 font-semibold"
                    onClick={() => setIsLogin(true)}
                  >
                    Sign In
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
