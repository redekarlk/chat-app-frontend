

// "use client";
// import React, { useState, useContext } from "react";
// import { useRouter } from "next/navigation"; // ✅ Next.js navigation
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContent } from "@/context/AppContext";

// const AuthPage = () => {
//   const router = useRouter();
//   const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

//   const [state, setState] = useState("Login"); // default to Login
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       axios.defaults.withCredentials = true; // send cookies

//       const endpoint = state === "Sign Up" ? "/api/user-auth/register" : "/api/user-auth/login";
//       const payload =
//         state === "Sign Up" ? { name, email, password } : { email, password };

//       const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

//       console.log("Auth Response:", data);

//       if (data.success) {
//         setIsLoggedIn(true);
//         await getUserData();
//         toast.success(state === "Sign Up" ? "Account created!" : "Login successful!");
//         router.push("/profile"); // ✅ Next.js redirect
//       } else {
//         toast.error(data.message || "Login/Register failed");
//       }
//     } catch (error) {
//       console.error("Login/Register Error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-500">
//       <div className="bg-blue-100 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
//         <h2 className="text-3xl font-semibold text-gray-700 text-center mb-3">
//           {state === "Sign Up" ? "Create account" : "Login"}
//         </h2>
//         <form onSubmit={onSubmitHandler}>
//           {state === "Sign Up" && (
//             <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-blue-50">
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 className="bg-transparent outline-none text-gray-600 w-full"
//                 type="text"
//                 placeholder="Full Name"
//                 required
//               />
//             </div>
//           )}

//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-blue-50">
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="bg-transparent outline-none text-gray-600 w-full"
//               type="email"
//               placeholder="Email ID"
//               required
//             />
//           </div>

//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-blue-50">
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="bg-transparent outline-none text-gray-600 w-full"
//               type="password"
//               placeholder="Password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-900 text-white font-medium"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : state}
//           </button>
//         </form>

//         <p className="text-center text-xs mt-4">
//           {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
//           <span
//             onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
//             className="text-blue-900 cursor-pointer underline"
//           >
//             {state === "Sign Up" ? "Login here" : "Sign Up"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;




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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-black p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {state === "Sign Up" ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 focus-within:ring-2 ring-indigo-400">
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

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 focus-within:ring-2 ring-indigo-400">
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

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 focus-within:ring-2 ring-indigo-400">
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-lg transition duration-300"
          >
            {loading ? "Processing..." : state}
          </button>
        </form>

        <p className="text-center text-sm text-white/80 mt-6">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="cursor-pointer font-semibold text-indigo-300 hover:text-indigo-200"
          >
            {state === "Sign Up" ? "Login here" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
