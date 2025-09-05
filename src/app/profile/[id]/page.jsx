

// "use client";

// import { useEffect, useState, useContext } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { AppContent } from "@/context/AppContext";

// const ProfilePage = () => {
//   const { id } = useParams(); // Profile user ID from URL
//   const { userData } = useContext(AppContent); // Logged-in user
//   const router = useRouter();

//   const [profileUser, setProfileUser] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [isFollower, setIsFollower] = useState(false);
//   const [hasRequested, setHasRequested] = useState(false);

//   // Fetch profile user info
//   useEffect(() => {
//     if (!id || !userData?._id) return;

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`/api/user-auth/${id}`);
//         const user = res.data.user;
//         setProfileUser(user);

//         // ✅ Am I following them?
//         if (user.followers?.includes(userData._id)) {
//           setIsFollowing(true);
//         }

//         // ✅ Are they following me?
//         if (user.following?.includes(userData._id)) {
//           setIsFollower(true);
//         }

//         // ✅ Did I send a follow request?
//         if (user.followRequests?.includes(userData._id)) {
//           setHasRequested(true);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching user:", err.response?.data || err.message);
//       }
//     };

//     fetchUser();
//   }, [id, userData]);

//   // Send follow request or follow back
//   const handleFollow = async () => {
//     try {
//       await axios.post(`/api/user-auth/${id}/follow-request`, {
//         receiverId: id,
//       });

//       // ✅ If it’s a follow back, mark as following
//       if (isFollower && !isFollowing) {
//         setIsFollowing(true);
//       } else {
//         setHasRequested(true);
//       }
//     } catch (err) {
//       console.error("❌ Error sending follow request:", err.response?.data || err.message);
//     }
//   };

//   // Navigate to chat
//   const goToChat = () => {
//     router.push(`/chat/${id}`);
//   };

//   if (!profileUser) return <p className="p-6">Loading profile...</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       {/* User Info */}
//       <div className="flex items-center gap-4 mb-6">
//         <img
//           src={profileUser.avatar || "https://i.ibb.co/2kR5zq0/default-avatar.png"}
//           alt={profileUser.name}
//           className="w-20 h-20 rounded-full border"
//         />
//         <div>
//           <h1 className="text-2xl font-bold">{profileUser.name}</h1>
//           <p className="text-gray-600">{profileUser.email}</p>

//           {/* Followers & Following Count */}
//           <div className="flex gap-6 mt-2 text-sm text-gray-700">
//             <span>{profileUser.followers?.length || 0} Followers</span>
//             <span>{profileUser.following?.length || 0} Following</span>
//           </div>
//         </div>
//       </div>


//       {/* Follow/Message Buttons */}
//       <div className="mt-4">
//         {isFollowing || isFollower ? (
//           // ✅ Either I follow them OR they follow me → Message
//           <button
//             onClick={goToChat}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Message
//           </button>
//         ) : hasRequested ? (
//           // ✅ Request already sent
//           <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
//             Request Sent
//           </button>
//         ) : (
//           // ✅ Default → Follow
//           <button
//             onClick={handleFollow}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//           >
//             Follow
//           </button>
//         )}
//       </div>

//     </div>
//   );
// };

// export default ProfilePage;




"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { AppContent } from "@/context/AppContext";
import {
  FaChevronLeft,
  FaUserPlus,
  FaMessage,
  FaUserClock,
} from "react-icons/fa6";

const ProfilePage = () => {
  const { id } = useParams();
  const { userData } = useContext(AppContent);
  const router = useRouter();

  const [profileUser, setProfileUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch profile user info and set relationship states
  useEffect(() => {
    if (!id || !userData?._id) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user-auth/${id}`);
        const user = res.data.user;
        setProfileUser(user);

        // Check relationship status
        setIsFollowing(user.followers?.includes(userData._id));
        setIsFollower(user.following?.includes(userData._id));
        setHasRequested(user.followRequests?.includes(userData._id));
      } catch (err) {
        console.error("❌ Error fetching user:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, userData]);

  // Handle follow/follow back request
  const handleFollow = async () => {
    try {
      await axios.post(`/api/user-auth/${id}/follow-request`, {
        receiverId: id,
      });

      // Update state based on the relationship status
      if (isFollower && !isFollowing) {
        setIsFollowing(true);
      } else {
        setHasRequested(true);
      }
    } catch (err) {
      console.error("❌ Error sending follow request:", err.response?.data || err.message);
    }
  };

  // Navigate to the chat page
  const goToChat = () => {
    router.push(`/chat/${id}`);
  };

  // Render different states based on loading and data availability
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6 text-center bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        <p className="text-xl font-semibold mb-2">Profile Not Found</p>
        <p className="text-sm text-gray-500">The user profile could not be loaded. Please check the ID and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => router.back()} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 p-2 rounded-full">
          <FaChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">{profileUser.name}</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col items-center">
        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 w-full max-w-sm text-center transform transition-transform duration-300 hover:scale-105">
          <img
            src={profileUser.avatar || "https://placehold.co/128x128/60a5fa/ffffff?text=U"}
            alt={profileUser.name}
            className="w-28 h-28 rounded-full border-4 border-blue-400 dark:border-blue-600 mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold mb-1">{profileUser.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">@{profileUser.username || "user"}</p>

          <div className="flex justify-center gap-6 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-lg">{profileUser.followers?.length || 0}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-lg">{profileUser.following?.length || 0}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Following</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 w-full max-w-sm">
          {isFollowing || isFollower ? (
            <button
              onClick={goToChat}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors"
            >
              <FaMessage /> Message
            </button>
          ) : hasRequested ? (
            <button className="w-full flex items-center justify-center gap-2 bg-gray-400 text-white font-medium py-3 rounded-xl shadow-md cursor-not-allowed">
              <FaUserClock /> Request Sent
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-medium py-3 rounded-xl shadow-md hover:bg-green-700 transition-colors"
            >
              <FaUserPlus /> Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;