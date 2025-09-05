// "use client";

// import { useContext, useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { AppContent } from "@/context/AppContext";
// import { useParams } from "next/navigation";

// const ChatPage = () => {
//   const { userData } = useContext(AppContent);


//   const [receiverUserData, setReceiverUserData] = useState('');

//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [conversationId, setConversationId] = useState(null);

//   const { id } = useParams();

//   const senderId = userData?._id;
//   const receiverId = id; // 👈 replace with dynamic (other user)

//   const messagesEndRef = useRef(null);

//   //   console.log("convo id : " , conversationId)

//   // Connect socket
//   useEffect(() => {
//     const s = io(process.env.NEXT_PUBLIC_BACKEND_URL);
//     setSocket(s);

//     return () => {
//       s.disconnect();
//     };
//   }, []);

//   // Create or get conversation
//   useEffect(() => {
//     // if (!senderId || !receiverId) return;

//     const createOrGetConversation = async () => {
//       try {
//         const { data } = await axios.post(
//           "/api/conversations",
//           { senderId, receiverId }
//         );

//         // console.log("data",data)

//         if (data.success) {
//           setConversationId(data.conversation._id); // ✅ use dynamic ID
//         }
//       } catch (err) {
//         console.error("Error creating/getting conversation:", err);
//       }
//     };

//     createOrGetConversation();
//   }, [senderId, receiverId]);

//   // Auto-join conversation + load history + listen to messages
//   useEffect(() => {
//     if (!socket || !conversationId) return;

//     // join room
//     socket.emit("joinConversation", conversationId);

//     // fetch old messages
//     const fetchMessages = async () => {
//       try {
//         const { data } = await axios.get(
//           `/api/messages/${conversationId}`
//         );
//         if (data.success) {
//           setMessages(data.messages);
//         }
//       } catch (err) {
//         console.error("Failed to fetch messages:", err);
//       }
//     };

//     fetchMessages();


//     // receiver user data
//     // useEffect(() => {
//     //   // if (!id || !receiverUserData?._id) return;

//     //   const fetchUser = async () => {
//     //     try {
//     //       const res = await axios.get(`/api/user-auth/${receiverId}`);
//     //       const user = res.data.user;

//     //       setReceiverUserData(user);

//     //     } catch (err) {
//     //       console.error("❌ Error fetching user:", err.response?.data || err.message);
//     //     }
//     //   };

//     //   fetchUser();
//     // }, []);

//     // console.log("receiver user data", receiverUserData);

//     // listen new messages
//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [socket, conversationId]);

//   // --- Fetch receiver user data ---
//   useEffect(() => {
//     if (!receiverId) return;

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-auth/${receiverId}`);
//         setReceiverUserData(res.data.user);
//       } catch (err) {
//         console.error("❌ Error fetching user:", err.response?.data || err.message);
//       }
//     };

//     fetchUser();
//   }, [receiverId]);

//   // console.log("receiver user data", receiverUserData);


//   // Auto scroll to bottom when new message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = () => {
//     if (text.trim() === "" || !senderId || !conversationId) return;

//     const newMsg = { conversationId, sender: senderId, text };
//     socket.emit("sendMessage", newMsg);
//     setText("");
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-blue-600 text-white px-4 py-3 shadow">
//         <h1 className="text-lg font-semibold">Chat {receiverUserData?.name}</h1>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((m, i) => {
//           const isMe = m.sender?._id === senderId || m.sender === senderId;
//           return (
//             <div
//               key={i}
//               className={`flex ${isMe ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-lg max-w-xs ${isMe
//                   ? "bg-blue-500 text-white rounded-br-none"
//                   : "bg-gray-300 text-gray-900 rounded-bl-none"
//                   }`}
//               >
//                 <p>{m.text}</p>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="p-3 border-t bg-white flex gap-2">
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;




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
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
            <FaChevronLeft size={24} />
          </button>
          <div className="w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-blue-800 dark:text-blue-200">
            {receiverUserData ? (
              <span className="font-bold text-xl">
                {receiverUserData.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <FaRegCircleUser size={24} />
            )}
          </div>
          <h1 className="text-lg font-semibold">{receiverUserData?.name || "User"}</h1>
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
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded-bl-none"
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
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 border-0 rounded-full px-4 py-2 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Send message"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;