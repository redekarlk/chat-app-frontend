// "use client";

// import { useContext, useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { AppContent } from "@/context/AppContext";

// const ChatPage = () => {
//     const { userData } = useContext(AppContent);

//     const [socket, setSocket] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [text, setText] = useState("");



//     // Hardcoded conversation for now
//     const conversationId = "68b9cc1d4284760f90beb5fe";
//     const senderId = userData?._id;

//     const messagesEndRef = useRef(null);

//     // Connect socket
//     useEffect(() => {
//         const s = io("http://localhost:8001");
//         setSocket(s);

//         return () => {
//             s.disconnect();
//         };
//     }, []);

//     // Auto-join conversation + load history + listen to messages
//     useEffect(() => {
//         if (!socket || !conversationId) return;

//         // join room
//         socket.emit("joinConversation", conversationId);

//         // fetch old messages
//         const fetchMessages = async () => {
//             try {
//                 const { data } = await axios.get(
//                     `http://localhost:8001/api/messages/${conversationId}`
//                 );
//                 if (data.success) {
//                     setMessages(data.messages);
//                 }
//             } catch (err) {
//                 console.error("Failed to fetch messages:", err);
//             }
//         };

//         fetchMessages();

//         // listen new messages
//         socket.on("receiveMessage", (msg) => {
//             setMessages((prev) => [...prev, msg]);
//         });

//         return () => {
//             socket.off("receiveMessage");
//         };
//     }, [socket, conversationId]);

//     // Auto scroll to bottom when new message
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const sendMessage = () => {
//         if (text.trim() === "" || !senderId || !conversationId) return;

//         const newMsg = { conversationId, sender: senderId, text };
//         socket.emit("sendMessage", newMsg);
//         // setMessages((prev) => [...prev, newMsg]);
//         setText("");
//     };

//     return (
//         <div className="flex flex-col h-screen bg-gray-100">
//             {/* Header */}
//             <div className="bg-blue-600 text-white px-4 py-3 shadow">
//                 <h1 className="text-lg font-semibold">Chat</h1>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3">
//                 {messages.map((m, i) => {
//                     const isMe = m.sender?._id === senderId || m.sender === senderId;
//                     return (
//                         <div
//                             key={i}
//                             className={`flex ${isMe ? "justify-end" : "justify-start"}`}
//                         >
//                             <div
//                                 className={`px-4 py-2 rounded-lg max-w-xs ${isMe
//                                         ? "bg-blue-500 text-white rounded-br-none"
//                                         : "bg-gray-300 text-gray-900 rounded-bl-none"
//                                     }`}
//                             >
//                                 <p>{m.text}</p>
//                             </div>
//                         </div>
//                     );
//                 })}
//                 <div ref={messagesEndRef} />
//             </div>

//             {/* Input */}
//             <div className="p-3 border-t bg-white flex gap-2">
//                 <input
//                     type="text"
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 text-black  focus:ring-blue-500"
//                     placeholder="Type a message..."
//                 />
//                 <button
//                     onClick={sendMessage}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ChatPage;




"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { AppContent } from "@/context/AppContext";
import { useParams } from "next/navigation";

const ChatPage = () => {
  const { userData } = useContext(AppContent);

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState(null);

   const { id } = useParams();

  const senderId = userData?._id;
  const receiverId = id; // 👈 replace with dynamic (other user)

  const messagesEndRef = useRef(null);

//   console.log("convo id : " , conversationId)

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
    // if (!senderId || !receiverId) return;

    const createOrGetConversation = async () => {
      try {
        const { data } = await axios.post(
          "/api/conversations",
          { senderId, receiverId }
        );

        // console.log("data",data)

        if (data.success) {
          setConversationId(data.conversation._id); // ✅ use dynamic ID
        }
      } catch (err) {
        console.error("Error creating/getting conversation:", err);
      }
    };

    createOrGetConversation();
  }, [senderId, receiverId]);

  // Auto-join conversation + load history + listen to messages
  useEffect(() => {
    if (!socket || !conversationId) return;

    // join room
    socket.emit("joinConversation", conversationId);

    // fetch old messages
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

    // listen new messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, conversationId]);

  // Auto scroll to bottom when new message
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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 shadow">
        <h1 className="text-lg font-semibold">Chat</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => {
          const isMe = m.sender?._id === senderId || m.sender === senderId;
          return (
            <div
              key={i}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  isMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-300 text-gray-900 rounded-bl-none"
                }`}
              >
                <p>{m.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
