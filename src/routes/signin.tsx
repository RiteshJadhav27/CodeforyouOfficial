import React from 'react';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-text">
      {/* Left Visual */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1596495577886-d920f1e7380b?auto=format&fit=crop&w=800&q=80')"}}>
        <div className="bg-black bg-opacity-40 p-10 rounded-lg max-w-lg text-white">
          <h1 className="text-4xl font-extrabold mb-6">Welcome to CodeForYou</h1>
          <p className="text-lg">
            Join the community of innovators and start building your dream project website today.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-lg">
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
                  className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-brand focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
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
                  className="appearance-none relative block w-full px-4 py-3 text-text bg-light border border-border rounded-md placeholder-mutedText focus:outline-brand focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-semibold rounded-md text-white bg-brand hover:bg-brandLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-mutedText text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-brand hover:text-brandLight font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
