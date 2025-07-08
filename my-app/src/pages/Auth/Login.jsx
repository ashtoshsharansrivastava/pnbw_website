// src/pages/Auth/Login.jsx
export default function Login() {
  return (
    <main className="min-h-screen bg-midnight text-white py-16">
      <div className="container mx-auto px-6 space-y-10">
        {/* Hero Section */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold">Login</h1>
          <p className="text-gray-300 text-lg">
            Welcome back! Please log in to access your account.
          </p>
        </header>

        {/* Login Form */}
        <section className="space-y-6 max-w-md mx-auto">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-2 p-4 w-full rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              className="mt-2 p-4 w-full rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
            >
              Log In
            </button>
          </div>
        </section>

        {/* Sign-up Option */}
        <section className="text-center">
          <p className="text-gray-300">
            Don't have an account? <a href="/signup" className="text-indigo-400 hover:text-indigo-500">Sign Up</a>
          </p>
        </section>
      </div>
    </main>
  )
}
