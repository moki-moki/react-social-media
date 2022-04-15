import { useContext, useEffect, useRef, useState } from "react";
import {
  ChatBoxContainer,
  ChatBoxInput,
  ChatBoxMessageBox,
  FriendListContainer,
  FriendListWrapper,
  MainWindowContainer,
  OnlineUsers,
  OnlineUsersWrapper,
} from "./styles/ChatwindowStyles/ChatWindowStyles";
import { getConversation, getMessages, sendMsg } from "./utils/apiHelpers";
import { AuthContext } from "./context/AuthContext";
import { useHistory } from "react-router-dom";
import Conversation from "./Conversation";
import Message from "./Message";
import { io } from "socket.io-client";
import OnlineUsersComp from "./OnlineUsersComp";

const ChatWindow = () => {
  const user = useContext(AuthContext);
  const history = useHistory();

  // List of conversations
  const [conversations, setConversations] = useState([]);

  // Current onversation chat
  const [currentChat, setCurrentChat] = useState(null);

  // List of conversation messages
  const [messages, setMessages] = useState([]);

  // scrolling when there is a new message
  const scrollRef = useRef();

  //   Input msg
  const [inputMessage, setInputMessage] = useState("");

  // Arrival msg
  const [arrivalMsg, setArrivalMsg] = useState(null);

  // Online users
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Sockets
  const socket = useRef();

  // Socket effect so it calls only once
  useEffect(() => {
    socket.current = io("ws://localhost:5000");

    socket.current.on("getMessage", (data) => {
      setArrivalMsg({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // Conversations
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }

    socket.current.emit("addUser", user.user.user._id);

    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.user.user.friends.filter((f) => users.some((u) => u.userId === f))
      );
      console.log(onlineUsers);
    });

    // Gets conversations
    const getConvs = async (id) => {
      getConversation(id).then((data) => setConversations(data));
    };

    getConvs(user.user.user._id);
  }, [user]);

  // Arrival Effect
  useEffect(() => {
    arrivalMsg &&
      currentChat?.members.includes(arrivalMsg.sender) &&
      setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg, currentChat]);

  //Messages
  useEffect(() => {
    // gets messages from conversation
    const getMsgs = (id) => {
      getMessages(id).then((data) => setMessages(data));
    };

    getMsgs(currentChat?._id);
  }, [currentChat]);

  // scroll into view message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //   HANDLERS
  const submitHandler = async (e) => {
    e.preventDefault();

    // creating new message that inputs to dom
    const message = {
      sender: user.user.user._id,
      text: inputMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.user.user._id
    );

    if (messages !== "") {
      socket.current.emit("sendMessage", {
        senderId: user.user.user._id,
        receiverId,
        text: inputMessage,
      });

      try {
        await sendMsg(message).then((data) => setMessages([...messages, data]));
        await setInputMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <MainWindowContainer>
      <FriendListContainer>
        <FriendListWrapper>
          <h1>Conversations</h1>
          <div>
            {/* CONVERSATIONS */}
            {conversations?.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation con={conversation} id={user.user.user._id} />
              </div>
            ))}
          </div>
        </FriendListWrapper>
      </FriendListContainer>
      {/* CHAT WINDOW */}
      {!currentChat ? (
        <ChatBoxContainer></ChatBoxContainer>
      ) : (
        <ChatBoxContainer>
          <ChatBoxMessageBox>
            {messages.map((msg, i) => (
              <div key={i} ref={scrollRef}>
                <Message
                  stamp={msg.createdAt}
                  text={msg.text}
                  senderId={msg.sender}
                  id={user.user.user._id}
                />
              </div>
            ))}
          </ChatBoxMessageBox>
          <form onSubmit={submitHandler}>
            <ChatBoxInput
              placeholder="Type message..."
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
          </form>
        </ChatBoxContainer>
      )}
      <OnlineUsers>
        <OnlineUsersWrapper>
          <h1>Online Users</h1>
          <OnlineUsersComp
            userId={user.user.user._id}
            setCurrentChat={setCurrentChat}
            onlineUsers={onlineUsers}
          />
        </OnlineUsersWrapper>
      </OnlineUsers>
    </MainWindowContainer>
  );
};

export default ChatWindow;
