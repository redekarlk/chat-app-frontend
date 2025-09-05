


"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

export default function SocketTestPage() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [senderId, setSenderId] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const s = io("http://localhost:8001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  const joinConversation = async () => {
    if (!conversationId.trim()) return alert("Enter a conversationId");

    // 1. Join room via socket
    socket.emit("joinConversation", conversationId);
    setJoined(true);

    // 2. Fetch previous messages from backend
    try {
      const { data } = await axios.get(
        `http://localhost:8001/api/messages/${conversationId}`
        // `http://localhost:8001/api/messages/68b9cc1d4284760f90beb5fe`
      );

      console.log(data)
      if (data.success) {
        setMessages(data.messages); // preload history
      }

      console.log(data.messages)
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }

    // 3. Listen for new messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  };

  const sendMessage = () => {
    if (text.trim() === "" || !senderId || !conversationId) return;

    const newMsg = { conversationId, sender: senderId, text };
    socket.emit("sendMessage", newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setText("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Socket.IO Chat Test</h1>

      {/* Input fields for IDs */}
      {!joined && (
        <div className="space-y-3 mb-4">
          <input
            type="text"
            value={conversationId}
            onChange={(e) => setConversationId(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Enter Conversation ID"
          />
          <input
            type="text"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Enter Your User ID"
          />
          <button
            onClick={joinConversation}
            className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Join Conversation
          </button>
        </div>
      )}

      {joined && (
        <>
          <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4 bg-gray-800">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">No messages yet</p>
            ) : (
              messages.map((m, i) => (
                <div key={i} className="mb-2">
                  <span className="font-semibold">
                    {/* {m.sender?.name }: */}
                  </span>{" "}
                  <span>{m.text}</span>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border rounded-lg px-3 py-2 flex-1"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
