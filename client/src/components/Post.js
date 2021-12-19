import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  PostCardBottomBar,
  PostCardBtnContainer,
  PostCardButtonDelete,
  PostCardButtonsDislike,
  PostCardButtonsLike,
  PostCardContainer,
  PostCardContentContainer,
  PostCardDesc,
  PostCardUserContainer,
  PostCardUserImg,
  PostCardUserInfo,
  PostCardWrapper,
} from "./styles/PostCardStyles";
import { Link } from "react-router-dom";
import DeletePostModal from "./DeletePostModal";
import moment from "moment";
import { likeHelper, dislikeHelper, fetchPostData } from "./utils/apiHelpers";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [dislike, setDislike] = useState(post.dislikes.length);
  const [isDislike, setIsDislike] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userPost, setUserPost] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const { user } = useContext(AuthContext);

  const myInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user.user._id,
    }),
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(user.user._id));
    setIsDislike(post.dislikes.includes(user.user._id));
  }, [user._id, post.likes, post.dislikes]);

  // fetching post data
  useEffect(() => {
    fetchPostData(post.userId).then((data) => setUserPost(data));
  }, [post.userId]);

  // like func
  const likeHandle = async () => {
    likeHelper(post._id, myInit);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // dislike func
  const dislikeHandle = async () => {
    dislikeHelper(post._id, myInit);
    setDislike(isDislike ? dislike - 1 : dislike + 1);
    setIsDislike(!isDislike);
  };

  // deleting post
  const deletePost = async (id) => {
    setOpenModal(!openModal);
  };

  return (
    <PostCardContainer>
      <PostCardContentContainer>
        <PostCardUserContainer>
          <PostCardWrapper>
            <PostCardUserInfo>
              <Link to={`/profile/${userPost.username}`}>
                <PostCardUserImg
                  src={`
https://avatars.dicebear.com/api/identicon/${userPost.username}.svg
        `}
                />
              </Link>
              <p style={{ color: "#fff" }}>{userPost.username}</p>
            </PostCardUserInfo>
            <div>
              <p>
                Posted At:
                <span style={{ color: "#fff" }}>
                  {moment(post.createdAt).format("DD MMM  HH:mm")}
                </span>
              </p>
            </div>
          </PostCardWrapper>
          <div style={{ width: "100%" }}>
            <PostCardDesc>
              <Link style={{ color: "#b2becd" }} to={`/posts/${post._id}`}>
                {post.desc}
              </Link>
            </PostCardDesc>
          </div>
          <img
            src={"http://localhost:5000/images/" + post.img}
            style={{ width: "100%" }}
            alt=""
          />
          <PostCardBottomBar>
            <PostCardBtnContainer>
              <PostCardButtonsLike
                style={{ backgroundColor: isLiked ? "#09c372" : "transparent" }}
                onClick={likeHandle}
              >
                &#128077; {like > 0 ? like : null}
              </PostCardButtonsLike>
              <PostCardButtonsDislike
                style={{
                  backgroundColor: isDislike ? "#ff3860" : "transparent",
                }}
                onClick={dislikeHandle}
              >
                &#128169;{dislike > 0 ? dislike : null}
              </PostCardButtonsDislike>
            </PostCardBtnContainer>
            {user.user._id === post.userId ? (
              <PostCardButtonDelete onClick={() => deletePost(post._id)}>
                &#10060;
              </PostCardButtonDelete>
            ) : null}
            {/* modal for delete */}
            {openModal ? (
              <DeletePostModal
                setOpenModal={setOpenModal}
                openModal={openModal}
                id={post._id}
              />
            ) : null}
          </PostCardBottomBar>
        </PostCardUserContainer>
      </PostCardContentContainer>
    </PostCardContainer>
  );
};

export default Post;
