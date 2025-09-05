// "use client";

// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AppContent } from "@/context/AppContext";

// const RequestPage = () => {
//   const { userData } = useContext(AppContent); // logged-in user
//   const [requests, setRequests] = useState([userData?.followRequests]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch follow requests
// //   useEffect(() => {
// //     const fetchRequests = async () => {
// //       if (!userData?._id) return;
// //       setLoading(true);
// //       try {
// //         const res = await axios.get(
// //           `http://localhost:8001/api/user-auth/${userData._id}/requests`
// //         );
// //         setRequests(res.data.requests || []);
// //       } catch (err) {
// //         console.error("❌ Error fetching requests:", err.response?.data || err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRequests();
// //   }, [userData]);

//   // ✅ Accept follow request
//   const handleAccept = async (requesterId) => {
//     try {
//       await axios.post(`http://localhost:8001/api/user-auth/${userData._id}/accept-request`, {
//         requesterId,
//       });
//       setRequests((prev) => prev.filter((req) => req._id !== requesterId));
//     } catch (err) {
//       console.error("❌ Error accepting request:", err.response?.data || err.message);
//     }
//   };

//   // ✅ Reject follow request
//   const handleReject = async (requesterId) => {
//     try {
//       await axios.post(`http://localhost:8001/api/user-auth/${userData._id}/reject-request`, {
//         requesterId,
//       });
//       setRequests((prev) => prev.filter((req) => req._id !== requesterId));
//     } catch (err) {
//       console.error("❌ Error rejecting request:", err.response?.data || err.message);
//     }
//   };

//   if (loading) return <p className="p-6">Loading requests...</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Follow Requests</h1>

//       {requests.length === 0 ? (
//         <p className="text-gray-500">No pending requests</p>
//       ) : (
//         <ul className="space-y-4">
//           {requests.map((req) => (
//             <li
//               key={req._id}
//               className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-semibold">{req.name}</p>
//                 <p className="text-sm text-gray-600">{req.email}</p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleAccept(req._id)}
//                   className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleReject(req._id)}
//                   className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RequestPage;



// "use client";

// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AppContent } from "@/context/AppContext";

// const RequestPage = () => {
//   const { userData } = useContext(AppContent); // logged-in user
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch follow requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       if (!userData?._id) return;
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `/api/user-auth/${userData._id}/requests`
//         );
//         setRequests(res.data.requests || []);
//       } catch (err) {
//         console.error(
//           "❌ Error fetching requests:",
//           err.response?.data || err.message
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [userData]);

//   // ✅ Accept follow request
//   const handleAccept = async (requesterId) => {
//     try {
//       await axios.post(
//         `/api/user-auth/${requesterId}/accept-request`
//         // { requesterId }
//       );
//       setRequests((prev) => prev.filter((req) => req._id !== requesterId));
//     } catch (err) {
//       console.error("❌ Error accepting request:", err.response?.data || err.message);
//     }
//   };

//   // ✅ Reject follow request
//   const handleReject = async (requesterId) => {
//     try {
//       await axios.post(
//         `/api/user-auth/${requesterId}/reject-request`
//         // { requesterId }
//       );
//       setRequests((prev) => prev.filter((req) => req._id !== requesterId));
//     } catch (err) {
//       console.error("❌ Error rejecting request:", err.response?.data || err.message);
//     }
//   };

//   if (loading) return <p className="p-6">Loading requests...</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Follow Requests</h1>

//       {requests.length === 0 ? (
//         <p className="text-gray-500">No pending requests</p>
//       ) : (
//         <ul className="space-y-4">
//           {requests.map((req) => (
//             <li
//               key={req._id}
//               className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-semibold">{req.name}</p>
//                 <p className="text-sm text-gray-600">{req.email}</p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleAccept(req._id)}
//                   className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleReject(req._id)}
//                   className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RequestPage;



// 'use client';
// import { AppContent } from '@/context/AppContext';
// import axios from 'axios';
// import React, { useState, useEffect, useContext } from 'react';

// // The main RequestPage component
// const RequestPage = () => {
//   const { userData } = useContext(AppContent); 
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);


  


  
//   useEffect(() => {
//     const fetchRequests = async () => {
//       if (!userData?._id) return;
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `/api/user-auth/${userData._id}/requests`
//         );
//         setRequests(res.data.requests || []);
//       } catch (err) {
//         console.error("❌ Error fetching requests:", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [userData]);

//   const handleAccept = async (requesterId) => {
//     try {
//       await axios.post(`/api/user-auth/${requesterId}/accept-request`);
//       setRequests((prev) => prev.filter((req) => req._id !== requesterId));
//     } catch (err) {
//       console.error("❌ Error accepting request:", err.response?.data || err.message);
//     }
//   };

//   const handleReject = async (requesterId) => {
//     try {
//       await axios.post(`/api/user-auth/${requesterId}/reject-request`);
//       setRequests((prev) => prev.filter((req) => req._id !== requesterId));
//     } catch (err) {
//       console.error("❌ Error rejecting request:", err.response?.data || err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-950 transition-colors">
//         <div className="flex items-center space-x-2">
//           <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           <p className="text-gray-400 text-lg">Loading requests...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 transition-colors py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-xl mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transition-colors">
        
//         {/* Header */}
//         <div className="bg-gray-800 p-6 text-center border-b border-gray-700">
//           <h1 className="text-2xl font-bold text-white">Follow Requests</h1>
//         </div>

//         {/* Request List */}
//         <div className="p-6">
//           {requests?.length === 0 ? (
//             <p className="text-gray-500 text-center py-8">
//               No pending requests.
//             </p>
//           ) : (
//             <ul className="space-y-4">
//               {requests?.map((req) => (
//                 <li
//                   key={req._id}
//                   className="p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between border border-gray-700 bg-gray-800"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full object-cover border-2 border-blue-400" />
//                     <div>
//                       <p className="font-semibold text-gray-100">{req.name}</p>
//                       <p className="text-sm text-gray-400">{req.email}</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleAccept(req._id)}
//                       className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-green-700 transition-colors transform hover:scale-105"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => handleReject(req._id)}
//                       className="bg-red-600 text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-red-700 transition-colors transform hover:scale-105"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestPage;



'use client';
import Navbar from '@/components/Navbar';
import { AppContent } from '@/context/AppContext';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

const RequestPage = () => {
  const { userData } = useContext(AppContent);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userData?._id) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/user-auth/${userData._id}/requests`);
        setRequests(res.data.requests || []);
      } catch (err) {
        console.error("❌ Error fetching requests:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userData]);

  const handleAccept = async (requesterId) => {
    try {
      await axios.post(`/api/user-auth/${requesterId}/accept-request`);
      setRequests((prev) => prev.filter((req) => req._id !== requesterId));
    } catch (err) {
      console.error("❌ Error accepting request:", err.response?.data || err.message);
    }
  };

  const handleReject = async (requesterId) => {
    try {
      await axios.post(`/api/user-auth/${requesterId}/reject-request`);
      setRequests((prev) => prev.filter((req) => req._id !== requesterId));
    } catch (err) {
      console.error("❌ Error rejecting request:", err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 transition-colors px-4">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-400 text-lg">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gray-950 transition-colors py-6 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-xl w-full mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transition-colors mt-16">
        
        {/* Header */}
        <div className="bg-gray-800 p-5 sm:p-6 text-center border-b border-gray-700">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Follow Requests</h1>
        </div>

        {/* Request List */}
        <div className="p-4 sm:p-6">
          {requests?.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm sm:text-base">
              No pending requests.
            </p>
          ) : (
            <ul className="space-y-4">
              {requests.map((req) => (
                <li
                  key={req._id}
                  className="p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row sm:items-center justify-between border border-gray-700 bg-gray-800"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
                    <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full object-cover border-2 border-blue-400" />
                    <div className="truncate">
                      <p className="font-semibold text-gray-100 truncate">{req.name}</p>
                      <p className="text-sm text-gray-400 truncate">{req.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="flex-1 sm:flex-none bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full font-medium shadow-md hover:bg-green-700 transition-colors transform hover:scale-105 text-sm sm:text-base"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="flex-1 sm:flex-none bg-red-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full font-medium shadow-md hover:bg-red-700 transition-colors transform hover:scale-105 text-sm sm:text-base"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default RequestPage;
