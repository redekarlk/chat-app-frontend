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

  const handleFollow = async () => {
    try {
      await axios.post(`/api/user-auth/${id}/follow-request`, {
        receiverId: id,
      });

      if (isFollower && !isFollowing) {
        setIsFollowing(true);
      } else {
        setHasRequested(true);
      }
    } catch (err) {
      console.error("❌ Error sending follow request:", err.response?.data || err.message);
    }
  };

  const goToChat = () => {
    router.push(`/chat/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6 text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <p className="text-xl font-semibold mb-2">Profile Not Found</p>
        <p className="text-sm opacity-70">Could not load the profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}


      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-black p-4 flex items-center gap-3 sticky top-0 z-10 shadow-md">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-white/20 transition"
        >
          <FaChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold">{profileUser.name}</h1>
      </div>


      {/* Main */}
      <div className="flex-1 p-6 flex flex-col items-center">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm text-center border border-white/20 shadow-xl">
          <img
            src={
              profileUser.avatar ||
              "https://placehold.co/128x128/60a5fa/ffffff?text=U"
            }
            alt={profileUser.name}
            className="w-24 h-24 rounded-full border-4 border-indigo-500 mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold">{profileUser.name}</h2>
          <p className="text-sm text-gray-300">@{profileUser.username}</p>

          {/* Followers */}
          <div className="flex justify-center gap-10 mt-4 text-sm">
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">
                {profileUser.followers?.length || 0}
              </span>
              <span className="text-xs text-gray-400">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">
                {profileUser.following?.length || 0}
              </span>
              <span className="text-xs text-gray-400">Following</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 w-full max-w-sm">
          {isFollowing || isFollower ? (
            <button
              onClick={goToChat}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90 transition"
            >
              <FaMessage /> Message
            </button>
          ) : hasRequested ? (
            <button className="w-full flex items-center justify-center gap-2 bg-gray-500/60 text-white font-semibold py-3 rounded-xl shadow-md cursor-not-allowed">
              <FaUserClock /> Request Sent
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90 transition"
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
