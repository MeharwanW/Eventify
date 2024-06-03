import React, { useEffect, useState,useRef  } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import moment from "moment";
import io from "socket.io-client";

// Connect to the socket server
const socket = io.connect("http://localhost:3001");

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(), // Format the time using moment.js
      };

      try {
        await axios.post("http://localhost:4000/sendMessage", messageData);
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getMessages", 
      {
        params: {
          room:room
        },
      });
      setMessageList(response.data.messages);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  useEffect(() => {

    fetchMessages();
    socket.emit("join_room", room);
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      scrollToBottom();
    });


    return () => {
      socket.off("receive_message");
    };
  }, [room]);




  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
  <p id="time">{moment(messageContent.time).format("HH:mm")}</p>
  <p id="author">{messageContent.author}</p>
</div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Send Message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
