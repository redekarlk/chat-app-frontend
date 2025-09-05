

// "use client";
// import { AppContent } from "@/context/AppContext";
// import Link from "next/link";
// import React, { useContext } from "react";

// const Profile = () => {
//   const { userData } = useContext(AppContent);

//   if (!userData) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <p className="text-gray-600 text-xl">Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-10">
//       {/* Header */}
//       <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
//         Welcome, {userData.name}! 🎉
//       </h1>

//       {/* Card */}
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
//         {/* Avatar */}
//         <div className="flex justify-center mb-6">
//           <img
//             src={userData.avatar || "https://i.ibb.co/2kR5zq0/default-avatar.png"}
//             alt={userData.name}
//             className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover"
//           />
//         </div>

//         {/* Info */}
//         <p className="text-lg font-medium text-gray-700 mb-2">
//           {userData.name}
//         </p>
//         <p className="text-gray-500">{userData.email}</p>

//         {/* Stats */}
//         <div className="flex justify-around mt-6">
//           <div className="text-center">
//             <p className="text-xl font-bold text-gray-800">
//               {userData.followers?.length || 0}
//             </p>
//             <p className="text-gray-500 text-sm">Followers</p>
//           </div>
//           <div className="text-center">
//             <p className="text-xl font-bold text-gray-800">
//               {userData.following?.length || 0}
//             </p>
//             <p className="text-gray-500 text-sm">Following</p>
//           </div>
//           {/* <div className="text-center">
//             <p className="text-xl font-bold text-gray-800">
//               {userData.followRequests?.length || 0}
//             </p>
//             <p className="text-gray-500 text-sm">Requests</p>
//           </div> */}

//           <div className="text-center">
//             <Link href="/requests" className="block hover:text-blue-600">
//               <p className="text-xl font-bold text-gray-800">
//                 {userData.followRequests?.length || 0}
//               </p>
//               <p className="text-gray-500 text-sm">Requests</p>
//             </Link>
//           </div>
//         </div>

//         {/* Divider */}
//         <hr className="my-6 border-gray-200" />

//         {/* Meta */}
//         <div className="text-sm text-gray-600 space-y-1">
//           <p>
//             <span className="font-medium">User ID:</span> {userData._id}
//           </p>
//           <p>
//             <span className="font-medium">Joined:</span>{" "}
//             {new Date(userData.createdAt).toLocaleDateString()}
//           </p>
//           <p>
//             <span className="font-medium">Last Update:</span>{" "}
//             {new Date(userData.updatedAt).toLocaleDateString()}
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="mt-6 flex gap-4">
//           <button className="flex-1 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition">
//             Edit Profile
//           </button>
//           <button className="flex-1 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition">
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


"use client";
import Navbar from '@/components/Navbar';
import { AppContent } from '@/context/AppContext';
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';

// The main Profile component
const Profile = () => {
 
  const { userData } = useContext(AppContent);


  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 text-xl animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
    
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 flex flex-col items-center">

      {/* Top Banner and Avatar */}
      <div className="w-full bg-blue-500 dark:bg-blue-800 h-48 flex justify-center items-end relative">
        <div className="flex justify-center mb-6 absolute bottom-0 transform translate-y-1/2">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
          />
        </div>
      </div>

      {/* Profile Content */}
      <div className="w-full max-w-2xl px-4 py-20">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full text-center transition-transform duration-300">

          {/* User Info */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-4">{userData.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{userData.email}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-prose mx-auto">
            {userData.bio}
          </p>



          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-xl shadow-inner border-l-4 border-blue-500 hover:scale-105 transform transition-transform duration-200">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{userData.followers.length}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Followers</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-xl shadow-inner border-l-4 border-blue-500 hover:scale-105 transform transition-transform duration-200">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{userData.following.length}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Following</p>
            </div>
            <Link href="/requests">
              <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-xl shadow-inner border-l-4 border-blue-500 hover:scale-105 transform transition-transform duration-200">
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{userData.followRequests.length}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Requests</p>
              </div>
              </Link>
          </div>

          {/* Buttons */}
          {/* <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-3 rounded-lg bg-blue-500 text-white font-medium shadow-md hover:bg-blue-600 transition-colors">
              Edit Profile
            </button>
            <button className="flex-1 py-3 rounded-lg bg-red-500 text-white font-medium shadow-md hover:bg-red-600 transition-colors">
              Logout
            </button>
          </div> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
