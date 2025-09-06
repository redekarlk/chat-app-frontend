
"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { AppContent } from "@/context/AppContext";
import { useParams } from "next/navigation";
import {
  FaPaperPlane,
  FaChevronLeft,
  FaRegCircleUser,
} from "react-icons/fa6";

const ChatPage = () => {
  const { userData } = useContext(AppContent);
  const [receiverUserData, setReceiverUserData] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState(null);

  const { id } = useParams();
  const senderId = userData?._id;
  const receiverId = id;

  const messagesEndRef = useRef(null);

  // Connect socket
  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_BACKEND_URL);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Create or get conversation
  useEffect(() => {
    if (!senderId || !receiverId) return;

    const createOrGetConversation = async () => {
      try {
        const { data } = await axios.post(
          "/api/conversations",
          { senderId, receiverId }
        );
        if (data.success) {
          setConversationId(data.conversation._id);
        }
      } catch (err) {
        console.error("Error creating/getting conversation:", err);
      }
    };
    createOrGetConversation();
  }, [senderId, receiverId]);

  // Fetch receiver user data
  useEffect(() => {
    if (!receiverId) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-auth/${receiverId}`);
        setReceiverUserData(res.data.user);
      } catch (err) {
        console.error("❌ Error fetching user:", err.response?.data || err.message);
      }
    };
    fetchUser();
  }, [receiverId]);

  // Auto-join conversation + load history + listen to messages
  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit("joinConversation", conversationId);

    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `/api/messages/${conversationId}`
        );
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, conversationId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (text.trim() === "" || !senderId || !conversationId) return;

    const newMsg = { conversationId, sender: senderId, text };
    socket.emit("sendMessage", newMsg);
    setText("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50  dark:bg-gradient-to-br from-indigo-950 via-gray-800 to-gray-950 text-gray-900 dark:text-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-950 via-blue-950 to-purple-950 shadow-md p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaChevronLeft size={20} />
          </button>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200 via-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
            {receiverUserData ? (
              <span className="text-xl">
                {receiverUserData.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <FaRegCircleUser size={24} />
            )}
          </div>

          <h1 className="text-lg font-semibold text-white drop-shadow">
            {receiverUserData?.name || "User"}
          </h1>
        </div>
      </div>


      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => {
          const isMe = m.sender?._id === senderId || m.sender === senderId;
          return (
            <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] md:max-w-[60%] px-4 py-2 rounded-xl text-wrap break-words
    ${isMe
                    ? "bg-gradient-to-r from-blue-700 to-blue-950 text-white rounded-br-none"
                    : "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-violet-700 dark:to-violet-950 text-gray-900 dark:text-gray-50 rounded-bl-none"
                  }`}
              >
                <p>{m.text}</p>
              </div>

            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input container */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 
                  p-4 flex items-center gap-2 rounded-t-md">

        <div className="flex-1 p-[3px] rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 w-full border-0 rounded-2xl px-4 py-2 
                   bg-gray-100 dark:bg-gray-900 
                   focus:outline-none focus:ring-2 focus:ring-purple-400
                   text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Type a message..."
          />
        </div>

        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white p-3 rounded-full 
                 hover:from-pink-500 hover:via-purple-600 hover:to-indigo-700 
                 transition-all duration-300 
                 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md"
          aria-label="Send message"
        >
          <FaPaperPlane size={16} />
        </button>

      </div>
      {/* </div> */}

    </div>
  );
};

export default ChatPage;