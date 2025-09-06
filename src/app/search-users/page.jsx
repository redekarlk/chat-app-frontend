
'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SearchUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/user-auth/search?query=${query}`);

        if (Array.isArray(res.data)) {
          setResults(res.data);
        } else if (res.data?.users) {
          setResults(res.data.users);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("❌ Error fetching users:", err.response?.data || err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950">
      <Navbar />

      <div className="p-4 sm:p-6 max-w-lg mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center mt-20 
                       bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Search Users
        </h1>

        {/* Search Box */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg px-4 py-3 
                       bg-gray-800/60 border border-gray-700 
                       text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400 mb-4 animate-pulse">Searching...</p>
        )}

        {/* Results */}
        <ul className="space-y-4">
          {Array.isArray(results) && results.length === 0 && !loading && query && (
            <p className="text-center text-gray-500">No users found</p>
          )}

          {Array.isArray(results) &&
            results.map((user) => (
              <li
                key={user._id}
                className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 
                           hover:from-indigo-900 hover:to-indigo-950 
                           transition shadow-md hover:shadow-xl"
              >
                <Link
                  href={`/profile/${user._id}`}
                  className="flex items-center w-full gap-4 p-4"
                >
                  <img
                    src={user.avatar || `https://i.ibb.co/2kR5zq0/default-avatar.png`}
                    alt={user.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-indigo-500 shadow"
                  />
                  <div className="flex-1 truncate">
                    <p className="font-semibold text-white truncate text-lg">{user.name}</p>
                    <p className="text-sm text-gray-400 truncate">{user.email}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
