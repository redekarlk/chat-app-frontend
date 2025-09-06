

'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';

// toast.success("welcome");

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white flex flex-col">
      {/* Hero Section */}
      <header className="relative py-24 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 opacity-20 blur-3xl"></div>

        <h1 className="relative text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
          Welcome to Voxtro Chat
        </h1>
        <p className="relative text-lg max-w-2xl mx-auto mb-8 text-gray-300 leading-relaxed">
          Connect instantly with your friends and colleagues. Chat securely and share your moments in real time.
        </p>
        <Link href="/auth">
          <button className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition">
            Get Started
          </button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
          Why Choose Voxtro?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">⚡ Real-Time Chat</h3>
            <p className="text-gray-300">
              Messages delivered instantly with low latency so you never miss a conversation.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3 text-indigo-300">🔒 Secure & Private</h3>
            <p className="text-gray-300">
              End-to-end encryption keeps your conversations private and safe.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3 text-teal-300">🌍 Cross Platform</h3>
            <p className="text-gray-300">
              Access Voxtro from web, mobile, or desktop with the same seamless experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-950 to-black text-gray-400 py-6 mt-auto text-center border-t border-gray-800">
        <p className="text-sm">&copy; {new Date().getFullYear()} Voxtro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
