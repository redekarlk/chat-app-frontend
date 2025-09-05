// 'use client';
// import { AppContent } from "@/context/AppContext";
// import React, { useContext } from "react";

// const Profile = () => {
//   const { userData } = useContext(AppContent);
//   // const navigate = useNavigate();

//   if (!userData) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-600 text-xl">Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="mt-36 flex flex-col items-center px-4 text-center text-gray-800">
//         <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-4">
//           Hey User: {userData.name}!
//         </h1>

//         <div className="bg-gray-500 p-6 rounded-lg shadow-md w-full max-w-md">
//           <p className="text-lg mb-2">
//             <strong>Name:</strong> {userData.name}
//           </p>
//           <p className="text-lg">
//             <strong>Email:</strong> {userData.email}
//           </p>
//         </div>
//       </div>

//       <hr className="my-8 border-b-4 border-gray-400" />
//     </div>
//   );
// };

// export default Profile;



"use client";
import { AppContent } from "@/context/AppContext";
import Link from "next/link";
import React, { useContext } from "react";

const Profile = () => {
  const { userData } = useContext(AppContent);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600 text-xl">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-10">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        Welcome, {userData.name}! 🎉
      </h1>

      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={userData.avatar || "https://i.ibb.co/2kR5zq0/default-avatar.png"}
            alt={userData.name}
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
        </div>

        {/* Info */}
        <p className="text-lg font-medium text-gray-700 mb-2">
          {userData.name}
        </p>
        <p className="text-gray-500">{userData.email}</p>

        {/* Stats */}
        <div className="flex justify-around mt-6">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">
              {userData.followers?.length || 0}
            </p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">
              {userData.following?.length || 0}
            </p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
          {/* <div className="text-center">
            <p className="text-xl font-bold text-gray-800">
              {userData.followRequests?.length || 0}
            </p>
            <p className="text-gray-500 text-sm">Requests</p>
          </div> */}

          <div className="text-center">
            <Link href="/requests" className="block hover:text-blue-600">
              <p className="text-xl font-bold text-gray-800">
                {userData.followRequests?.length || 0}
              </p>
              <p className="text-gray-500 text-sm">Requests</p>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        {/* Meta */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium">User ID:</span> {userData._id}
          </p>
          <p>
            <span className="font-medium">Joined:</span>{" "}
            {new Date(userData.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Last Update:</span>{" "}
            {new Date(userData.updatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="flex-1 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition">
            Edit Profile
          </button>
          <button className="flex-1 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
