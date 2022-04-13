import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { PostCardButtonDelete } from "./styles/PostCardStyles";
import {
  FriendContainer,
  FriendImage,
  FriendNameAndImageContainer,
  FriendsContainer,
  FriendsModalMainContainer,
  ModalCloseContainer,
  ModalOverlay,
} from "./styles/ProfileStyles/FriendsModalStyles";
import {
  AddFriendBtn,
  RemoveFriendBtn,
} from "./styles/ProfileStyles/ProfileStyles";

const FriendsModal = ({
  usersFriends,
  toggleFriends,
  setToggleFriends,
  userId,
  id,
  addFriendHandler,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ModalOverlay>
      <FriendsModalMainContainer>
        {/* Exit Modal Btn */}
        <ModalCloseContainer>
          <PostCardButtonDelete
            onClick={() => setToggleFriends(!toggleFriends)}
          >
            &#10060;
          </PostCardButtonDelete>
        </ModalCloseContainer>
        <FriendsContainer>
          {usersFriends.map((friend) => (
            <FriendContainer key={friend._id}>
              <FriendNameAndImageContainer>
                <FriendImage
                  src={`https://avatars.dicebear.com/api/identicon/${friend.username}.svg`}
                />
                <h5>{friend.username}</h5>
              </FriendNameAndImageContainer>
              {/* Render add friend btn if the main user dosen't have that friend in friends list */}
              {user.user.friends.includes(friend._id) ? (
                <RemoveFriendBtn>Remove Friend &#128549; </RemoveFriendBtn>
              ) : (
                <>
                  {friend._id === user.user._id ? null : (
                    <AddFriendBtn onClick={() => addFriendHandler(id, userId)}>
                      Add a Friend &#128526;
                    </AddFriendBtn>
                  )}
                </>
              )}
            </FriendContainer>
          ))}
        </FriendsContainer>
      </FriendsModalMainContainer>
    </ModalOverlay>
  );
};

export default FriendsModal;
