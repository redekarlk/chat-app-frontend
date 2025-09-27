// "use client";

// import { useEffect, useState, useRef, useContext } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { AppContent } from "@/context/AppContext";
// import { FaPaperPlane, FaRegCircleUser, FaBars, FaChevronLeft } from "react-icons/fa6";

// export default function MessagesPage() {
//   const { userData } = useContext(AppContent);
//   const senderId = userData?._id;

//   const [conversations, setConversations] = useState([]);
//   const [activeConvo, setActiveConvo] = useState(null);
//   const [conversationId, setConversationId] = useState(null);
//   const [receiverId, setReceiverId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true); // default open on mobile

//   const [isOpen, setIsOpen] = useState(false);

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);


//   const toggleMenu = () => setIsOpen(!isOpen);

//    const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Search', href: '/search-users' },
//     { name: 'Profile', href: '/profile' },
//     { name: 'Messages', href: '/message' },
//     { name: 'Requests', href: '/requests' },
//   ];




//   // Initialize socket
//   useEffect(() => {
//     const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
//     socketRef.current = socket;

//     socket.on("connect", () => console.log("Socket connected"));

//     return () => socket.disconnect();
//   }, []);

//   // Fetch conversations
//   useEffect(() => {
//     if (!senderId) return;
//     const fetchConversations = async () => {
//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conversations`);
//         setConversations(res.data.conversations || []);

//         // Restore selected conversation from localStorage
//         const savedConversationId = localStorage.getItem("selectedConversationId");
//         if (savedConversationId) {
//           const savedConvo = res.data.conversations.find(c => c._id === savedConversationId);
//           if (savedConvo) {
//             handleSelectConversation(savedConvo, false);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching conversations:", err.message);
//       }
//     };
//     fetchConversations();
//   }, [senderId]);

//   const handleSelectConversation = (c, saveToStorage = true) => {
//     setActiveConvo(c);
//     setConversationId(c._id);
//     const receiver = c.participants.find((p) => p._id !== senderId)?._id;
//     setReceiverId(receiver);

//     if (saveToStorage) localStorage.setItem("selectedConversationId", c._id);

//     // Close sidebar on mobile after selecting
//     if (window.innerWidth < 768) setSidebarOpen(false);
//   };

//   // Join conversation + listen messages
//   useEffect(() => {
//     if (!socketRef.current || !conversationId) return;

//     const socket = socketRef.current;
//     socket.emit("joinConversation", conversationId);

//     const fetchMessages = async () => {
//       try {
//         const { data } = await axios.get(`/api/messages/${conversationId}`);
//         if (data.success) setMessages(data.messages);
//       } catch (err) {
//         console.error("Failed to fetch messages:", err);
//       }
//     };
//     fetchMessages();

//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => socket.off("receiveMessage");
//   }, [conversationId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = () => {
//     if (!text.trim() || !activeConvo) return;
//     const newMsg = { conversationId: activeConvo._id, sender: senderId, text };
//     socketRef.current.emit("sendMessage", newMsg);
//     setText("");
//   };

//   const receiverUserData = activeConvo
//     ? activeConvo.participants.find((p) => p._id !== senderId)
//     : null;

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 bg-gray-50 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-4 overflow-y-auto transform transition-transform duration-300 z-20
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-1/3`}
//       >
//         <h2 className="text-lg font-bold mb-4">Conversations</h2>
//         {conversations.map((c) => {
//           const otherUsers = c.participants.filter((p) => p._id !== senderId);
//           const lastMsg = c.lastMessage?.text || "No messages yet";

//           return (
//             <div
//               key={c._id}
//               onClick={() => handleSelectConversation(c)}
//               className={`p-3 mb-2 rounded-lg cursor-pointer ${activeConvo?._id === c._id
//                   ? "bg-blue-100 dark:bg-blue-800"
//                   : "hover:bg-gray-100 dark:hover:bg-gray-700"
//                 }`}
//             >
//               <p className="font-semibold">{otherUsers.map((p) => p.name).join(", ")}</p>
//               <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{lastMsg}</p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col md:ml-1/3">
//         {/* Header */}
//         <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-950 via-blue-950 to-purple-950 shadow-md p-3 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="text-white hover:text-gray-200 transition-colors md:hidden"
//             >
//               <FaBars size={20} />
//             </button>

//             <button
//               onClick={() => window.history.back()}
//               className="text-white hover:text-gray-200 transition-colors hidden md:block"
//             >
//               <FaChevronLeft size={20} />
//             </button>

//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200 via-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
//               {receiverUserData ? (
//                 <span className="text-xl">{receiverUserData.name.charAt(0).toUpperCase()}</span>
//               ) : (
//                 <FaRegCircleUser size={24} />
//               )}
//             </div>

//             <h1 className="text-lg font-semibold text-white drop-shadow">
//               {receiverUserData?.name || "User"}
//             </h1>


//             {/* Mobile Menu Button */}
//             <div className="md:hidden flex items-center">
//               <button onClick={toggleMenu} className="focus:outline-none">
//                 {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Messages */}
//         {activeConvo ? (
//           <>
//             <div className="flex-1 overflow-y-auto p-4 space-y-3">
//               {messages.map((m, i) => {
//                 const isMe = (m.sender?._id || m.sender) === senderId;
//                 return (
//                   <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[70%] px-4 py-2 rounded-xl break-words ${isMe
//                           ? "bg-gradient-to-r from-blue-700 to-blue-950 text-white rounded-br-none"
//                           : "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-violet-700 dark:to-violet-950 text-gray-900 dark:text-gray-50 rounded-bl-none"
//                         }`}
//                     >
//                       {m.text}
//                     </div>
//                   </div>
//                 );
//               })}
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex items-center gap-2 bg-white dark:bg-gray-800">
//               <div className="flex-1 p-[2px] rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600">
//                 <input
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                   placeholder="Type a message..."
//                   className="w-full border-0 rounded-2xl px-4 py-2 bg-gray-100 dark:bg-gray-900 focus:outline-none text-black dark:text-white"
//                 />
//               </div>
//               <button
//                 onClick={sendMessage}
//                 className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white p-3 rounded-full hover:scale-105 transition-transform"
//               >
//                 <FaPaperPlane size={16} />
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">Select a conversation</div>
//         )}
//       </div>
//     </div>
//   );
// }



// {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 border-t border-gray-700 transition-all duration-300">
//           <ul className="flex flex-col px-4 py-4 space-y-2">
//             {navLinks.map((link) => (
//               <li key={link.name}>
//                 <Link
//                   href={link.href}
//                   className="block px-3 py-2 rounded-md text-white hover:bg-blue-500 transition-colors font-medium"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               </li>
//             ))}

//             {/* Mobile Login/Logout */}
//             <li>
//               {userData ? (
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition font-medium"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <Link
//                   href="/auth"
//                   className="block px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-medium"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Login
//                 </Link>
//               )}
//             </li>
//           </ul>
//         </div>
//       )}




"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Link from "next/link";
import { AppContent } from "@/context/AppContext";
import { FaPaperPlane, FaRegCircleUser, FaBars, FaChevronLeft } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";

export default function MessagesPage() {
  const { userData, handleLogout } = useContext(AppContent); // make sure handleLogout is in context
  const senderId = userData?._id;

  const [conversations, setConversations] = useState([]);
  const [activeConvo, setActiveConvo] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true); // default open on desktop
  const [isOpen, setIsOpen] = useState(false); // mobile menu

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search-users" },
    { name: "Profile", href: "/profile" },
    { name: "Messages", href: "/message" },
    { name: "Requests", href: "/requests" },
  ];

  // Initialize socket
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
    socketRef.current = socket;
    socket.on("connect", () => console.log("Socket connected"));
    return () => socket.disconnect();
  }, []);

  // Fetch conversations
  useEffect(() => {
    if (!senderId) return;
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conversations`);
        setConversations(res.data.conversations || []);
        const savedConversationId = localStorage.getItem("selectedConversationId");
        if (savedConversationId) {
          const savedConvo = res.data.conversations.find((c) => c._id === savedConversationId);
          if (savedConvo) handleSelectConversation(savedConvo, false);
        }
      } catch (err) {
        console.error("Error fetching conversations:", err.message);
      }
    };
    fetchConversations();
  }, [senderId]);

  const handleSelectConversation = (c, saveToStorage = true) => {
    setActiveConvo(c);
    setConversationId(c._id);
    const receiver = c.participants.find((p) => p._id !== senderId)?._id;
    setReceiverId(receiver);
    if (saveToStorage) localStorage.setItem("selectedConversationId", c._id);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // Join conversation + listen messages
  useEffect(() => {
    if (!socketRef.current || !conversationId) return;
    const socket = socketRef.current;
    socket.emit("joinConversation", conversationId);
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/api/messages/${conversationId}`);
        if (data.success) setMessages(data.messages);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();
    socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));
    return () => socket.off("receiveMessage");
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !activeConvo) return;
    const newMsg = { conversationId: activeConvo._id, sender: senderId, text };
    socketRef.current.emit("sendMessage", newMsg);
    setText("");
  };

  const receiverUserData = activeConvo
    ? activeConvo.participants.find((p) => p._id !== senderId)
    : null;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-50 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-4 overflow-y-auto transform transition-transform duration-300 z-20
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-1/3`}
      >
        <h2 className="text-lg font-bold mb-4">Conversations</h2>
        {conversations.map((c) => {
          const otherUsers = c.participants.filter((p) => p._id !== senderId);
          const lastMsg = c.lastMessage?.text;
          return (
            <div
              key={c._id}
              onClick={() => handleSelectConversation(c)}
              className={`p-3 mb-2 rounded-lg cursor-pointer ${activeConvo?._id === c._id
                ? "bg-blue-100 dark:bg-blue-800"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              {/* <p className="font-semibold">{otherUsers.map((p) => p.name).join(", ")}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{lastMsg}</p> */}
              {lastMsg && (<div>
                <p className="font-semibold">{otherUsers.map((p) => p.name).join(", ")}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{lastMsg}</p>
              </div>)}
            </div>
          );
        })}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col md:ml-1/3">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-950 via-blue-950 to-purple-950 shadow-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:text-gray-200 transition-colors md:hidden"
            >
              <FaBars size={20} />
            </button>

            <button
              onClick={() => window.history.back()}
              className="text-white hover:text-gray-200 transition-colors hidden md:block"
            >
              <FaChevronLeft size={20} />
            </button>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200 via-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
              {receiverUserData ? (
                <span className="text-xl">{receiverUserData.name.charAt(0).toUpperCase()}</span>
              ) : (
                <FaRegCircleUser size={24} />
              )}
            </div>

            <h1 className="text-lg font-semibold text-white drop-shadow">
              {receiverUserData?.name || "User"}
            </h1>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center ml-28">
              <button onClick={toggleMenu} className="focus:outline-none">
                {isOpen ? <HiX className="h-6 w-6 text-white" /> : <HiMenu className="h-6 w-6 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 transition-all duration-300">
            <ul className="flex flex-col px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-white hover:bg-blue-500 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                {userData ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition font-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    className="block px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}

        {/* Messages */}
        {activeConvo ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => {
                const isMe = (m.sender?._id || m.sender) === senderId;
                return (
                  <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-xl break-words ${isMe
                        ? "bg-gradient-to-r from-blue-700 to-blue-950 text-white rounded-br-none"
                        : "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-violet-700 dark:to-violet-950 text-gray-900 dark:text-gray-50 rounded-bl-none"
                        }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex items-center gap-2 bg-white dark:bg-gray-800">
              <div className="flex-1 p-[2px] rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="w-full border-0 rounded-2xl px-4 py-2 bg-gray-100 dark:bg-gray-900 focus:outline-none text-black dark:text-white"
                />
              </div>
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white p-3 rounded-full hover:scale-105 transition-transform"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}

// 'use client';

// import { useState, useEffect, useRef, useContext } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import Link from "next/link";
// import { AppContent } from "@/context/AppContext";
// import { FaPaperPlane, FaRegCircleUser, FaBars, FaChevronLeft, FaMagnifyingGlass } from "react-icons/fa6";
// import { HiMenu, HiX } from "react-icons/hi";

// export default function MessagesPage() {
//   const { userData, handleLogout } = useContext(AppContent);
//   const senderId = userData?._id;

//   const [conversations, setConversations] = useState([]);
//   const [activeConvo, setActiveConvo] = useState(null);
//   const [conversationId, setConversationId] = useState(null);
//   const [receiverId, setReceiverId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Search", href: "/search-users" },
//     { name: "Profile", href: "/profile" },
//     { name: "Messages", href: "/message" },
//     { name: "Requests", href: "/requests" },
//   ];

//   const toggleMenu = () => setIsOpen(!isOpen);

//   // Initialize socket
//   useEffect(() => {
//     const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
//     socketRef.current = socket;
//     socket.on("connect", () => console.log("Socket connected"));
//     return () => socket.disconnect();
//   }, []);

//   // Fetch conversations
//   useEffect(() => {
//     if (!senderId) return;
//     const fetchConversations = async () => {
//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conversations`);
//         setConversations(res.data.conversations || []);
//         const savedConversationId = localStorage.getItem("selectedConversationId");
//         if (savedConversationId) {
//           const savedConvo = res.data.conversations.find((c) => c._id === savedConversationId);
//           if (savedConvo) handleSelectConversation(savedConvo, false);
//         }
//       } catch (err) {
//         console.error("Error fetching conversations:", err.message);
//       }
//     };
//     fetchConversations();
//   }, [senderId]);

//   const handleSelectConversation = (c, saveToStorage = true) => {
//     setActiveConvo(c);
//     setConversationId(c._id);
//     const receiver = c.participants.find((p) => p._id !== senderId)?._id;
//     setReceiverId(receiver);
//     if (saveToStorage) localStorage.setItem("selectedConversationId", c._id);
//     if (window.innerWidth < 768) setSidebarOpen(false);
//     setSearchQuery(""); // clear search when opening conversation
//   };

//   // Join conversation + listen messages
//   useEffect(() => {
//     if (!socketRef.current || !conversationId) return;
//     const socket = socketRef.current;
//     socket.emit("joinConversation", conversationId);

//     const fetchMessages = async () => {
//       try {
//         const { data } = await axios.get(`/api/messages/${conversationId}`);
//         if (data.success) setMessages(data.messages);
//       } catch (err) {
//         console.error("Failed to fetch messages:", err);
//       }
//     };
//     fetchMessages();

//     socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));
//     return () => socket.off("receiveMessage");
//   }, [conversationId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = () => {
//     if (!text.trim() || !activeConvo) return;
//     const newMsg = { conversationId: activeConvo._id, sender: senderId, text };
//     socketRef.current.emit("sendMessage", newMsg);
//     setText("");
//   };

//   // ----------------------------
//   // User Search Feature
//   // ----------------------------
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     const delay = setTimeout(async () => {
//       setSearchLoading(true);
//       try {
//         const res = await axios.get(`/api/user-auth/search?query=${searchQuery}`);
//         if (Array.isArray(res.data)) setSearchResults(res.data);
//         else if (res.data?.users) setSearchResults(res.data.users);
//         else setSearchResults([]);
//       } catch (err) {
//         console.error("Error searching users:", err.message);
//         setSearchResults([]);
//       } finally {
//         setSearchLoading(false);
//       }
//     }, 400);

//     return () => clearTimeout(delay);
//   }, [searchQuery]);

//   const handleStartConversation = async (user) => {
//     try {
//       // Check if conversation already exists
//       let convo = conversations.find(
//         (c) => c.participants.some((p) => p._id === user._id)
//       );
//       if (!convo) {
//         // Create new conversation
//         const res = await axios.post(`/api/conversations`, { participants: [senderId, user._id] });
//         convo = res.data.conversation;
//         setConversations((prev) => [convo, ...prev]);
//       }
//       handleSelectConversation(convo);
//     } catch (err) {
//       console.error("Error starting conversation:", err.message);
//     }
//   };

//   const receiverUserData = activeConvo
//     ? activeConvo.participants.find((p) => p._id !== senderId)
//     : null;

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 bg-gray-50 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-4 overflow-y-auto transform transition-transform duration-300 z-20
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-1/3`}
//       >
//         <h2 className="text-lg font-bold mb-4">Conversations</h2>

//         {/* Search Box */}
//         <div className="relative mb-4">
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full rounded-lg px-10 py-2 bg-gray-800/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//             <FaMagnifyingGlass />
//           </span>
//         </div>

//         {/* Search Results */}
//         {searchQuery && (
//           <ul className="mb-4 space-y-2">
//             {searchLoading && <p className="text-gray-400 animate-pulse">Searching...</p>}
//             {searchResults.map((user) => (
//               <li
//                 key={user._id}
//                 className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
//                 onClick={() => handleStartConversation(user)}
//               >
//                 <div className="flex items-center gap-2">
//                   <img
//                     src={user.avatar || `https://i.ibb.co/2kR5zq0/default-avatar.png`}
//                     alt={user.name}
//                     className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
//                   />
//                   <span>{user.name}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Conversations List */}
//         {conversations.map((c) => {
//           const otherUsers = c.participants.filter((p) => p._id !== senderId);
//           const lastMsg = c.lastMessage?.text;
//           return (
//             <div
//               key={c._id}
//               onClick={() => handleSelectConversation(c)}
//               className={`p-3 mb-2 rounded-lg cursor-pointer ${activeConvo?._id === c._id
//                 ? "bg-blue-100 dark:bg-blue-800"
//                 : "hover:bg-gray-100 dark:hover:bg-gray-700"
//                 }`}
//             >
//               {/* {otherUsers > 0 } */}
//               {lastMsg && (<div>
//                 <p className="font-semibold">{otherUsers.map((p) => p.name).join(", ")}</p>
//                 <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{lastMsg}</p>
//               </div>)}

//             </div>
//           );
//         })}
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col md:ml-1/3">
//         {/* Header */}
//         <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-950 via-blue-950 to-purple-950 shadow-md p-3 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="text-white hover:text-gray-200 transition-colors md:hidden"
//             >
//               <FaBars size={20} />
//             </button>

//             <button
//               onClick={() => window.history.back()}
//               className="text-white hover:text-gray-200 transition-colors hidden md:block"
//             >
//               <FaChevronLeft size={20} />
//             </button>

//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200 via-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
//               {receiverUserData ? (
//                 <span className="text-xl">{receiverUserData.name.charAt(0).toUpperCase()}</span>
//               ) : (
//                 <FaRegCircleUser size={24} />
//               )}
//             </div>

//             <h1 className="text-lg font-semibold text-white drop-shadow">
//               {receiverUserData?.name || "User"}
//             </h1>
//           </div>
//         </div>

//         {/* Messages */}
//         {activeConvo ? (
//           <>
//             <div className="flex-1 overflow-y-auto p-4 space-y-3">
//               {messages.map((m, i) => {
//                 const isMe = (m.sender?._id || m.sender) === senderId;
//                 return (
//                   <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[70%] px-4 py-2 rounded-xl break-words ${isMe
//                         ? "bg-gradient-to-r from-blue-700 to-blue-950 text-white rounded-br-none"
//                         : "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-violet-700 dark:to-violet-950 text-gray-900 dark:text-gray-50 rounded-bl-none"
//                         }`}
//                     >
//                       {m.text}
//                     </div>
//                   </div>
//                 );
//               })}
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex items-center gap-2 bg-white dark:bg-gray-800">
//               <div className="flex-1 p-[2px] rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600">
//                 <input
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                   placeholder="Type a message..."
//                   className="w-full border-0 rounded-2xl px-4 py-2 bg-gray-100 dark:bg-gray-900 focus:outline-none text-black dark:text-white"
//                 />
//               </div>
//               <button
//                 onClick={sendMessage}
//                 className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white p-3 rounded-full hover:scale-105 transition-transform"
//               >
//                 <FaPaperPlane size={16} />
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">
//             Select a conversation
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
