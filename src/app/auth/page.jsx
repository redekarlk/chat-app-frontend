"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "@/context/AppContext";
import { Mail, Lock, User } from "lucide-react";

const AuthPage = () => {
  const router = useRouter();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;

      const endpoint =
        state === "Sign Up" ? "/api/user-auth/register" : "/api/user-auth/login";
      const payload =
        state === "Sign Up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

      // console.log("auth data : ", data)

      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
        toast.success(
          state === "Sign Up" ? "Account created!" : "Login successful!"
        );
        router.push("/profile");
      } else {
        toast.error(data.message || "Login/Register failed");
      }
    } catch (error) {
      console.error(
        "Login/Register Error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-black/30 border border-gray-700 rounded-3xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {state === "Sign Up" ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50 focus-within:ring-2 ring-indigo-500 transition">
              <User className="w-5 h-5 text-white/70" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent flex-1 outline-none text-white placeholder-white/70"
              />
            </div>
          )}

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50 focus-within:ring-2 ring-indigo-500 transition">
            <Mail className="w-5 h-5 text-white/70" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="bg-transparent flex-1 outline-none text-white placeholder-white/70"
            />
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50 focus-within:ring-2 ring-indigo-500 transition">
            <Lock className="w-5 h-5 text-white/70" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="bg-transparent flex-1 outline-none text-white placeholder-white/70"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold shadow-lg transition duration-300"
          >
            {loading ? "Processing..." : state}
          </button>
        </form>

        <p className="text-center text-sm text-white/70 mt-6">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300"
          >
            {state === "Sign Up" ? "Login here" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
