import React, { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-text">
      {/* Left Visual */}
      <div
        className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${isLogin ? 
            "https://images.unsplash.com/photo-1596495577886-d920f1e7380b?auto=format&fit=crop&w=800&q=80" 
            : "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"}')`,
        }}
      >
        <div className="bg-black bg-opacity-40 p-10 rounded-lg max-w-lg text-white">
          <h1 className="text-4xl font-extrabold mb-6">{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h1>
          <p className="text-lg">
            {isLogin 
              ? 'Join the community of innovators and start building your dream project website today.'
              : 'Start building and tracking your projects with the best tools available.'}
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-lg">
          {isLogin ? (
            <>
              <h2 className="text-center text-3xl font-extrabold text-text">Sign in to your account</h2>
              <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-mutedText">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-mutedText">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-semibold rounded-md text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <p className="mt-6 text-center text-mutedText text-sm">
                Don't have an account?{' '}
                <button className="text-accent hover:text-accent/80 font-semibold" onClick={() => setIsLogin(false)}>
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-center text-3xl font-extrabold text-text">Sign up for a new account</h2>
              <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-mutedText">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-mutedText">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-mutedText">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                      placeholder="Create a password"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm_password" className="block text-sm font-semibold text-mutedText">
                      Confirm Password
                    </label>
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      required
                      className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-accent focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-semibold rounded-md text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="mt-6 text-center text-mutedText text-sm">
                Already have an account?{' '}
                <button className="text-accent hover:text-accent/80 font-semibold" onClick={() => setIsLogin(true)}>
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
