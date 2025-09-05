'use client';

import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to ChatApp</h1>
        <p className="text-lg max-w-xl mx-auto mb-6 text-gray-300">
          Connect instantly with your friends and colleagues. Chat securely and share your moments in real time.
        </p>
        <Link href="/auth">
          <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose ChatApp?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-white">Real-Time Chat</h3>
            <p className="text-gray-400">
              Messages delivered instantly with low latency so you never miss a conversation.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-white">Secure & Private</h3>
            <p className="text-gray-400">
              End-to-end encryption keeps your conversations private and safe.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-white">Cross Platform</h3>
            <p className="text-gray-400">
              Access ChatApp from web, mobile, or desktop with the same seamless experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 mt-auto text-center">
        <p>&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
