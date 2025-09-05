// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link"; // ✅ import Link

// export default function SearchUsers() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]); 
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!query.trim()) {
//       setResults([]);
//       return;
//     }

//     const delayDebounce = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `/api/user-auth/search?query=${query}`
//         );

//         console.log("searching : ", res.data);

//         if (Array.isArray(res.data)) {
//           setResults(res.data);
//         } else if (res.data?.users) {
//           setResults(res.data.users);
//         } else {
//           setResults([]);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching users:", err.response?.data || err.message);
//         setResults([]);
//       } finally {
//         setLoading(false);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [query]);

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🔍 Search Users</h1>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Enter name or email..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {loading && <p>Loading...</p>}

//       <ul className="space-y-2">
//         {Array.isArray(results) && results.length === 0 && !loading && query && (
//           <p className="text-gray-500">No users found</p>
//         )}
//         {Array.isArray(results) &&
//           results.map((user) => (
//             <li
//               key={user._id}
//               className="p-3 border rounded-lg shadow-sm flex justify-between hover:bg-gray-100 cursor-pointer"
//             >
//               <Link href={`/profile/${user._id}`} className="w-full flex justify-between">
//                 <div>
//                   <p className="font-semibold">{user.name}</p>
//                   <p className="text-sm text-gray-600">{user.email}</p>
//                 </div>
//               </Link>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }



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
    <div>
      <Navbar />

      <div className="p-4 sm:p-6 max-w-md mx-auto">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center mt-20 text-gray-900">🔍 Search Users</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {loading && (
          <p className="text-center text-gray-500 mb-4">Loading...</p>
        )}

        <ul className="space-y-3">
          {Array.isArray(results) && results.length === 0 && !loading && query && (
            <p className="text-center text-gray-400">No users found</p>
          )}

          {Array.isArray(results) &&
            results.map((user) => (
              <li
                key={user._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition flex items-center p-3 sm:p-4 cursor-pointer"
              >
                <Link href={`/profile/${user._id}`} className="flex items-center w-full gap-3 sm:gap-4">
                  <img
                    src={user.avatar || `/default-avatar.png`}
                    alt={user.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div className="flex-1 truncate">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
