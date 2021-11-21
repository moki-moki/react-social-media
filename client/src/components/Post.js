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
import moment from "moment";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [dislike, setDislike] = useState(post.dislikes.length);
  const [isDislike, setIsDislike] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userPost, setUserPost] = useState({});

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
  console.log(post);

  useEffect(() => {
    setIsLiked(post.likes.includes(user.user._id));
    setIsDislike(post.dislikes.includes(user.user._id));
  }, [user._id, post.likes, post.dislikes]);

  useEffect(() => {
    const fetchPostData = async () => {
      const req = await fetch(`/user?userId=${post.userId}`);
      const data = await req.json();
      setUserPost(data);
    };
    fetchPostData();
  }, [post.userId]);

  const likeHandle = async () => {
    try {
      await fetch("/posts/" + post._id + "/like", myInit);
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const dislikeHandle = async () => {
    try {
      await fetch("/posts/" + post._id + "/dislike", myInit);
    } catch (error) {
      console.log(error);
    }
    setDislike(isDislike ? dislike - 1 : dislike + 1);
    setIsDislike(!isDislike);
  };

  const deletePost = async (id) => {
    try {
      await fetch(`/posts/${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostCardContainer>
      <PostCardContentContainer>
        <PostCardUserContainer>
          <PostCardWrapper>
            <PostCardUserInfo>
              <PostCardUserImg
                src={`
https://avatars.dicebear.com/api/identicon/${userPost.username}.svg
        `}
              />
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
              <Link to={`/posts/${post._id}`}>{post.desc}</Link>
            </PostCardDesc>
          </div>
          <img src={"http://localhost:5000/images/" + post.img} alt="" />
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
          </PostCardBottomBar>
        </PostCardUserContainer>
      </PostCardContentContainer>
    </PostCardContainer>
  );
};

export default Post;
