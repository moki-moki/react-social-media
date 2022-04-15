import { useEffect, useState } from "react";
import { findConvo, getFriends } from "./utils/apiHelpers";

const OnlineUsersComp = ({ userId, setCurrentChat, onlineUsers }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getUsersFriends = async (id) => {
      await getFriends(id).then((data) => setFriends(data));
    };

    getUsersFriends(userId);
  }, [userId]);
  console.log(friends);

  // call online users on load
  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  console.log(onlineFriends);

  //find convo
  const findConversation = async (friendId) => {
    await findConvo(userId, friendId).then((data) => setCurrentChat(data));
  };

  return (
    <div>
      {onlineFriends.map((onlineFriend) => (
        <h1>{onlineFriend.username}</h1>
      ))}
    </div>
  );
};

export default OnlineUsersComp;
