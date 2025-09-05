// "use client";

// import { useEffect, useState, useContext } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { AppContent } from "@/context/AppContext";

// const ProfilePage = () => {
//   const { id } = useParams(); // The profile user ID from URL
//   const { userData } = useContext(AppContent); // logged in user
//   const router = useRouter();

//   const [profileUser, setProfileUser] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [hasRequested, setHasRequested] = useState(false);

//   console.log(userData?._id)

//   useEffect(() => {
//     if (!id) return;

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8001/api/user-auth/${id}`);
//         const user = res.data.user;
//         setProfileUser(user);

//         console.log("this is respomse", res.data);

//         // check if logged-in user is already following
//         if (user.followers?.includes(userData?._id)) {
//           setIsFollowing(true);
//         }

//         // check if logged-in user has already sent a follow request
//         if (user.followRequests?.includes(userData?._id)) {
//           setHasRequested(true);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching user:", err.response?.data || err.message);
//       }
//     };

//     fetchUser();
//   }, [id, userData]);

//   const handleFollow = async () => {
//     try {
//       await axios.post(`http://localhost:8001/api/user-auth/${id}/follow-request`, {
//         // senderId: userData._id,
//         receiverId: id,
//       });

//       setHasRequested(true); // mark request as sent
//     } catch (err) {
//       console.error("❌ Error sending follow request:", err.response?.data || err.message);
//     }
//   };

//   const goToChat = async () => {
//     try {
//       // Navigate user to chat page with this profile
//       router.push(`/chat/${id}`);
//     } catch (err) {
//       console.error("❌ Error navigating to chat:", err);
//     }
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
//         </div>
//       </div>

//       {/* Followers */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Followers</h2>
//         {profileUser.followers?.length > 0 ? (
//           <ul className="list-disc pl-6">
//             {profileUser.followers.map((followerId) => (
//               <li key={followerId}>{followerId}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No followers yet</p>
//         )}
//       </div>

//       {/* Follow/Message Button */}
//       <div>
//         {isFollowing ? (
//           <button
//             onClick={goToChat}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Message
//           </button>
//         ) : hasRequested ? (
//           <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
//             Request Sent
//           </button>
//         ) : (
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



// "use client";

// import { useEffect, useState, useContext } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { AppContent } from "@/context/AppContext";

// const ProfilePage = () => {
//     const { id } = useParams(); // The profile user ID from URL
//     const { userData } = useContext(AppContent); // logged in user
//     const router = useRouter();

//     const [profileUser, setProfileUser] = useState(null);
//     const [isFollowing, setIsFollowing] = useState(false);
//     const [hasRequested, setHasRequested] = useState(false);

//     useEffect(() => {
//         if (!id || !userData?._id) return;

//         const fetchUser = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:8001/api/user-auth/${id}`);
//                 const user = res.data.user;
//                 setProfileUser(user);

//                 // ✅ check if logged-in user is following OR being followed
//                 if (
//                     user.followers?.includes(userData._id) ||
//                     user.following?.includes(userData._id)
//                 ) {
//                     setIsFollowing(true);
//                 }

//                 // check if logged-in user already sent request
//                 if (user.followRequests?.includes(userData._id)) {
//                     setHasRequested(true);
//                 }
//             } catch (err) {
//                 console.error("❌ Error fetching user:", err.response?.data || err.message);
//             }
//         };

//         fetchUser();
//     }, [id, userData]);

//     const handleFollow = async () => {
//         try {
//             await axios.post(`http://localhost:8001/api/user-auth/${id}/follow-request`, {
//                 receiverId: id,
//             });
//             setHasRequested(true); // mark request as sent
//         } catch (err) {
//             console.error("❌ Error sending follow request:", err.response?.data || err.message);
//         }
//     };

//     const goToChat = () => {
//         router.push(`/chat/${id}`);
//     };

//     if (!profileUser) return <p className="p-6">Loading profile...</p>;

//     return (
//         <div className="p-6 max-w-xl mx-auto">
//             {/* User Info */}
//             <div className="flex items-center gap-4 mb-6">
//                 <img
//                     src={profileUser.avatar || "https://i.ibb.co/2kR5zq0/default-avatar.png"}
//                     alt={profileUser.name}
//                     className="w-20 h-20 rounded-full border"
//                 />
//                 <div>
//                     <h1 className="text-2xl font-bold">{profileUser.name}</h1>
//                     <p className="text-gray-600">{profileUser.email}</p>

//                     {/* ✅ Followers & Following Count */}
//                     <div className="flex gap-6 mt-2 text-sm text-gray-700">
//                         <span>{profileUser.followers?.length || 0} Followers</span>
//                         <span>{profileUser.following?.length || 0} Following</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Follow/Message Button */}
//             {/* <div className="mt-4">
//                 {isFollowing ? (
//                     <button
//                         onClick={goToChat}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                     >
//                         Message
//                     </button>
//                 ) : hasRequested ? (
//                     <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
//                         Request Sent
//                     </button>
//                 ) : (
//                     <button
//                         onClick={handleFollow}
//                         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                     >
//                         Follow
//                     </button>
//                 )}
//             </div> */}

//             {/* Follow/Message Button */}
// <div className="mt-4">
//   {isFollowing ? (
//     // ✅ If I already follow them → Message
//     <button
//       onClick={goToChat}
//       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//     >
//       Message
//     </button>
//   ) : hasRequested ? (
//     // ✅ If request already sent → disable
//     <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
//       Request Sent
//     </button>
//   ) : isFollower ? (
//     // ✅ If they follow me but I don’t follow them → Follow Back
//     <button
//       onClick={handleFollow}
//       className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
//     >
//       Follow Back
//     </button>
//   ) : (
//     // ✅ Default case → Follow
//     <button
//       onClick={handleFollow}
//       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//     >
//       Follow
//     </button>
//   )}
// </div>

//         </div>
//     );
// };

// export default ProfilePage;



"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { AppContent } from "@/context/AppContext";

const ProfilePage = () => {
  const { id } = useParams(); // Profile user ID from URL
  const { userData } = useContext(AppContent); // Logged-in user
  const router = useRouter();

  const [profileUser, setProfileUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  // Fetch profile user info
  useEffect(() => {
    if (!id || !userData?._id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/api/user-auth/${id}`);
        const user = res.data.user;
        setProfileUser(user);

        // ✅ Am I following them?
        if (user.followers?.includes(userData._id)) {
          setIsFollowing(true);
        }

        // ✅ Are they following me?
        if (user.following?.includes(userData._id)) {
          setIsFollower(true);
        }

        // ✅ Did I send a follow request?
        if (user.followRequests?.includes(userData._id)) {
          setHasRequested(true);
        }
      } catch (err) {
        console.error("❌ Error fetching user:", err.response?.data || err.message);
      }
    };

    fetchUser();
  }, [id, userData]);

  // Send follow request or follow back
  const handleFollow = async () => {
    try {
      await axios.post(`http://localhost:8001/api/user-auth/${id}/follow-request`, {
        receiverId: id,
      });

      // ✅ If it’s a follow back, mark as following
      if (isFollower && !isFollowing) {
        setIsFollowing(true);
      } else {
        setHasRequested(true);
      }
    } catch (err) {
      console.error("❌ Error sending follow request:", err.response?.data || err.message);
    }
  };

  // Navigate to chat
  const goToChat = () => {
    router.push(`/chat/${id}`);
  };

  if (!profileUser) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profileUser.avatar || "https://i.ibb.co/2kR5zq0/default-avatar.png"}
          alt={profileUser.name}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h1 className="text-2xl font-bold">{profileUser.name}</h1>
          <p className="text-gray-600">{profileUser.email}</p>

          {/* Followers & Following Count */}
          <div className="flex gap-6 mt-2 text-sm text-gray-700">
            <span>{profileUser.followers?.length || 0} Followers</span>
            <span>{profileUser.following?.length || 0} Following</span>
          </div>
        </div>
      </div>

      {/* Follow/Message Buttons */}
      {/* <div className="mt-4">
        {isFollowing ? (
          // ✅ Already following → Message
          <button
            onClick={goToChat}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Message
          </button>
        ) : hasRequested ? (
          // ✅ Request already sent
          <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
            Request Sent
          </button>
        ) : isFollower ? (
          // ✅ They follow me, but I don’t follow them → Follow Back
          <button
            onClick={handleFollow}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Follow Back
          </button>
        ) : (
          // ✅ Default → Follow
          <button
            onClick={handleFollow}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Follow
          </button>
        )}
      </div> */}

      {/* Follow/Message Buttons */}
<div className="mt-4">
  {isFollowing || isFollower ? (
    // ✅ Either I follow them OR they follow me → Message
    <button
      onClick={goToChat}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Message
    </button>
  ) : hasRequested ? (
    // ✅ Request already sent
    <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
      Request Sent
    </button>
  ) : (
    // ✅ Default → Follow
    <button
      onClick={handleFollow}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
      Follow
    </button>
  )}
</div>

    </div>
  );
};

export default ProfilePage;
