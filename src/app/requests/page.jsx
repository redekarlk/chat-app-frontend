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



"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "@/context/AppContext";

const RequestPage = () => {
  const { userData } = useContext(AppContent); // logged-in user
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch follow requests
  useEffect(() => {
    const fetchRequests = async () => {
      if (!userData?._id) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/user-auth/${userData._id}/requests`
        );
        setRequests(res.data.requests || []);
      } catch (err) {
        console.error(
          "❌ Error fetching requests:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userData]);

  // ✅ Accept follow request
  const handleAccept = async (requesterId) => {
    try {
      await axios.post(
        `/api/user-auth/${requesterId}/accept-request`
        // { requesterId }
      );
      setRequests((prev) => prev.filter((req) => req._id !== requesterId));
    } catch (err) {
      console.error("❌ Error accepting request:", err.response?.data || err.message);
    }
  };

  // ✅ Reject follow request
  const handleReject = async (requesterId) => {
    try {
      await axios.post(
        `/api/user-auth/${requesterId}/reject-request`
        // { requesterId }
      );
      setRequests((prev) => prev.filter((req) => req._id !== requesterId));
    } catch (err) {
      console.error("❌ Error rejecting request:", err.response?.data || err.message);
    }
  };

  if (loading) return <p className="p-6">Loading requests...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Follow Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No pending requests</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{req.name}</p>
                <p className="text-sm text-gray-600">{req.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(req._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(req._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestPage;
