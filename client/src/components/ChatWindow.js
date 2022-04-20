import { useContext, useEffect, useRef, useState } from "react";
import {
  ChatBoxContainer,
  ChatBoxInput,
  ChatBoxMessageBox,
  ConvoHeadingContainer,
  FriendListContainer,
  FriendListWrapper,
  MainWindowContainer,
  OnlineUsers,
  OnlineUsersWrapper,
  OpenCloseBtn,
  OpenCloseOnlineFriends,
} from "./styles/ChatwindowStyles/ChatWindowStyles";
import { getConversation, getMessages, sendMsg } from "./utils/apiHelpers";
import { AuthContext } from "./context/AuthContext";
import { useHistory } from "react-router-dom";
import Conversation from "./Conversation";
import Message from "./Message";
import { io } from "socket.io-client";
import OnlineUsersComp from "./OnlineUsersComp";

const ChatWindow = () => {
  const { user } = useContext(AuthContext);

  // List of conversations
  const [conversations, setConversations] = useState([]);

  // Online users
  const [onlineUsers, setOnlineUsers] = useState([]);

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

  // OpenClose conversations on mobile
  const [toggleConversation, setToggleConversation] = useState(true);

  // OpenClose Online Friends on mobile
  const [toggleOnlineFriends, setToggleOnlineFriends] = useState(true);

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
    socket.current.emit("addUser", user.user._id, user.user.username);

    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.user.friends.filter((f) => users.some((u) => u.userId === f))
      );
    });

    // Gets conversations
    const getConvs = (id) => {
      getConversation(id).then((data) => setConversations(data));
    };

    getConvs(user.user._id);
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
      sender: user.user._id,
      text: inputMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.user._id
    );

    if (messages !== "") {
      socket.current.emit("sendMessage", {
        senderId: user.user._id,
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
      <FriendListContainer toggle={toggleConversation}>
        <FriendListWrapper>
          <ConvoHeadingContainer>
            <h1>Conversations</h1>

            <OpenCloseBtn
              toggle={toggleConversation}
              onClick={() => setToggleConversation(!toggleConversation)}
            >
              &#10060;
            </OpenCloseBtn>
          </ConvoHeadingContainer>
          <div>
            {/* CONVERSATIONS */}
            {conversations?.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation con={conversation} id={user.user._id} />
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
                  id={user.user._id}
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
      <OnlineUsers toggle={toggleOnlineFriends}>
        <OnlineUsersWrapper>
          <ConvoHeadingContainer>
            <OpenCloseOnlineFriends
              toggle={toggleOnlineFriends}
              onClick={() => setToggleOnlineFriends(!toggleOnlineFriends)}
            >
              &#10060;
            </OpenCloseOnlineFriends>
            <h1>Online User</h1>
          </ConvoHeadingContainer>
          <OnlineUsersComp
            userId={user.user._id}
            setCurrentChat={setCurrentChat}
            onlineUsers={onlineUsers}
          />
        </OnlineUsersWrapper>
      </OnlineUsers>
    </MainWindowContainer>
  );
};

export default ChatWindow;
