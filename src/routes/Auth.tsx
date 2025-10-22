import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import logow from '../assets/logow.png';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
  
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    if (!isLogin) {
      const passwordConfirm = (form.elements.namedItem("confirm_password") as HTMLInputElement).value;
      if (password !== passwordConfirm) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Passwords do not match!' });
        return;
      }
    }

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          name: name,
          phone: phone,
          createdAt: new Date(),
        });
      }
  
      // Redirect on success
      navigate('/userdashboard');
    } catch (error: any) {
      console.error("Auth error:", error);
      Swal.fire({ icon: 'error', title: 'Authentication Error', text: error.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-text">
      {/* Left Visual */}
      <div
        className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${isLogin ?
            "https://images.unsplash.com/photo-1596495577886-d920f1e7380b?auto=format&fit=crop&w=800&q=80" :
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"}')`,
        }}
      >
        <div className="flex flex-col items-center mb-8 -mt-10">
          <img
            src={isLogin ? logo : logow}
            alt="CodeForYou logo"
            className="h-16 w-auto mb-2"
          />
          <span
            className={`font-bold text-4xl tracking-wide ${isLogin ? "text-black" : "text-white"}`}
          >
            CodeForYou
          </span>
        </div>

        <div className="bg-black bg-opacity-90 p-10 rounded-lg max-w-lg text-white flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-6">{isLogin ? "Welcome Back!" : "Create Your Account"}</h1>
          <p className="text-lg">{isLogin
            ? "Join the community of innovators and start building your dream project website today."
            : "Start building and tracking your projects with the best tools available."}
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-lg">

          {isLogin ? (
            <>
              <h2 className="text-center text-3xl font-extrabold text-text">Sign in to your account</h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-mutedText">Email address</label>
                    <input
                      id="email" name="email" type="email" autoComplete="email" required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-mutedText">Password</label>
                    <input
                      id="password" name="password" type="password" autoComplete="current-password" required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-semibold rounded-md text-white bg-black hover:bg-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition"
                >
                  Sign In
                </button>
              </form>
              <p className="mt-6 text-center text-mutedText text-sm">
                Don't have an account?{' '}
                <button className="text-accent hover:text-gray-500 font-semibold text-black" onClick={() => setIsLogin(false)}>Sign Up</button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-center text-3xl font-extrabold text-text">Sign up for a new account</h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-mutedText">Name</label>
                    <input
                      id="name" name="name" type="text" required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent sm:text-sm"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-mutedText">Phone Number</label>
                    <input
                      id="phone" name="phone" type="tel" required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent sm:text-sm"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-mutedText">Email address</label>
                    <input
                      id="email" name="email" type="email" autoComplete="email" required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-mutedText">Password</label>
                    <input
                      id="password" name="password" type="password" autoComplete="new-password" required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent sm:text-sm"
                      placeholder="Create a password"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm_password" className="block text-sm font-semibold text-mutedText">Confirm Password</label>
                    <input
                      id="confirm_password" name="confirm_password" type="password" required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent sm:text-sm"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-semibold rounded-md text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition"
                >
                  Sign Up
                </button>
              </form>
              <p className="mt-6 text-center text-mutedText text-sm">
                Already have an account?{' '}
                <button className="text-black hover:text-gray-500 font-semibold" onClick={() => setIsLogin(true)}>Sign In</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
