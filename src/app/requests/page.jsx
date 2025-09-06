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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-blue-400 animate-spin"></div>
          <p className="text-blue-300 mt-4 font-semibold text-lg">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 py-12 px-4 flex justify-center">
        <div className="max-w-2xl w-full  mt-10 rounded-3xl   p-6 sm:p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-text">
              Follow Requests
            </h1>
            <p className="text-gray-300 mt-2">Manage who wants to connect with you</p>
          </div>

          {/* Requests List */}
          {requests?.length === 0 ? (
            <p className="text-gray-400 text-center py-10 text-lg italic">
              You’re all caught up! No requests pending.
            </p>
          ) : (
            <ul className="space-y-6">
              {requests.map((req) => (
                <li
                  key={req._id}
                  className="p-5 rounded-2xl bg-gradient-to-r from-gray-800/20 to-gray-900/20
                              flex flex-col sm:flex-row sm:items-center justify-between"
                >
                  {/* User Info */}
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    <img
                      src={req.avatar || `https://i.ibb.co/2kR5zq0/default-avatar.png`}
                      alt={req.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    />
                    <div>
                      <p className="font-bold text-white text-lg">{req.name}</p>
                      <p className="text-sm text-gray-400">{req.email}</p>
                    </div>
                  </div>

                  {/* Buttons */}


                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end w-full">
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="group flex items-center justify-center gap-2 px-5 py-2 rounded-full font-semibold 
               bg-white/10 backdrop-blur-md border border-green-400/10 text-green-300 
               transition-all duration-300 w-full sm:w-auto
               focus:outline-none hover:ring-1 hover:ring-green-400 hover:ring-offset-gray-900"
                    >
                      <span className="sm:inline">Accept</span>
                    </button>

                    <button
                      onClick={() => handleReject(req._id)}
                      className="group flex items-center justify-center gap-2 px-5 py-2 rounded-full font-semibold 
               bg-white/10 backdrop-blur-md border border-red-400/10 text-red-300 
               transition-all duration-300 w-full sm:w-auto
               focus:outline-none hover:ring-1 hover:ring-red-400 hover:ring-offset-gray-900"
                    >
                      <span className="sm:inline">Reject</span>
                    </button>
                  </div>



                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
