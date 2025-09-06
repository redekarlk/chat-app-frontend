

"use client";
import Navbar from '@/components/Navbar';
import { AppContent } from '@/context/AppContext';
import Link from 'next/link';
import React, { useContext } from 'react';

const Profile = () => {
  const { userData } = useContext(AppContent);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <p className="text-gray-400 text-xl animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center">
        
        {/* Banner */}
        <div className="w-full h-52 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 flex justify-center items-end relative">
          <div className="absolute bottom-0 translate-y-1/2">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-2xl px-4 py-24">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center border border-gray-700">
            
            {/* User Info */}
            <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
            <p className="text-gray-400 text-sm">{userData.email}</p>
            <p className="text-gray-300 mt-4 max-w-prose mx-auto">{userData.bio}</p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-5 rounded-xl border border-blue-600/40 shadow hover:scale-105 transition">
                <p className="text-2xl font-bold text-blue-400">{userData.followers.length}</p>
                <p className="text-gray-400 text-sm">Followers</p>
              </div>
              <div className="bg-gradient-to-br from-teal-600/20 to-blue-600/20 p-5 rounded-xl border border-teal-600/40 shadow hover:scale-105 transition">
                <p className="text-2xl font-bold text-teal-400">{userData.following.length}</p>
                <p className="text-gray-400 text-sm">Following</p>
              </div>
              <Link href="/requests" className="block">
                <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 p-5 rounded-xl border border-purple-600/40 shadow hover:scale-105 transition">
                  <p className="text-2xl font-bold text-purple-400">{userData.followRequests.length}</p>
                  <p className="text-gray-400 text-sm">Requests</p>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
