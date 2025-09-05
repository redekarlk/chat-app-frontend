// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function SearchUsers() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]); // always an array
//   const [loading, setLoading] = useState(false);

//   // 🔹 Auto-search with debounce
//   useEffect(() => {
//     if (!query.trim()) {
//       setResults([]);
//       return;
//     }

//     const delayDebounce = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `http://localhost:8001/api/user-auth/search?query=${query}`
//         );

//         console.log("🔍 API Response:", res.data);

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
//     }, 500); // wait 500ms after typing stops

//     return () => clearTimeout(delayDebounce); // cleanup on new keystroke
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
//               className="p-3 border rounded-lg shadow-sm flex justify-between"
//             >
//               <div>
//                 <p className="font-semibold">{user.name}</p>
//                 <p className="text-sm text-gray-600">{user.email}</p>
//               </div>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"; // ✅ import Link

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
        const res = await axios.get(
          `http://localhost:8001/api/user-auth/search?query=${query}`
        );

        console.log("searching : ", res.data);

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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔍 Search Users</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p>Loading...</p>}

      <ul className="space-y-2">
        {Array.isArray(results) && results.length === 0 && !loading && query && (
          <p className="text-gray-500">No users found</p>
        )}
        {Array.isArray(results) &&
          results.map((user) => (
            <li
              key={user._id}
              className="p-3 border rounded-lg shadow-sm flex justify-between hover:bg-gray-100 cursor-pointer"
            >
              <Link href={`/profile/${user._id}`} className="w-full flex justify-between">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
