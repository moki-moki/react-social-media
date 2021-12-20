import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { AuthContext } from "./context/AuthContext";
import {
  PostCardContainer,
  PostCardContentContainer,
  PostCardDesc,
  PostCardUserContainer,
  PostCardWrapper,
  PostCardUserInfo,
  PostCardUserImg,
  PostCardButtonDelete,
  PostCardBtnContainer,
  PostCardButtonsLike,
  PostCardButtonsDislike,
  PostCardBottomBar,
} from "./styles/PostCardStyles";
import { dislikeHelper, likeHelper } from "./utils/apiHelpers";

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [postData, setPostData] = useState({});
  const [userPost, setUserPost] = useState({});
  // like func
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [isDislike, setIsDislike] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const myInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user.user._id,
    }),
  };

  // like func
  const likeHandle = async () => {
    likeHelper(postData._id, myInit);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // dislike func
  const dislikeHandle = async () => {
    dislikeHelper(postData._id, myInit);
    setDislike(isDislike ? dislike - 1 : dislike + 1);
    setIsDislike(!isDislike);
  };

  // get posts data
  useEffect(() => {
    const getData = async () => {
      const req = await fetch(`/posts/${id}`);
      const data = await req.json();
      setPostData(data);
      setLike(data.likes.length);
      setDislike(data.dislikes.length);
      console.log(data);
    };
    getData();
  }, []);

  // like dislike funk
  useEffect(() => {
    setIsLiked(postData ? 0 : postData.likes.includes(user.user._id));
    setIsDislike(postData ? 0 : postData.dislikes.includes(user.user._id));
  }, [user._id, postData.likes, postData.dislikes]);

  // get users data for a post
  useEffect(() => {
    const fetchPostData = async () => {
      const req = await fetch(
        `/user?userId=${postData ? postData.userId : id}`
      );
      const data = await req.json();
      setUserPost(data);
    };
    fetchPostData();
  }, [postData]);

  // deletes a post duuh...
  const deletePost = async (id) => {
    try {
      await fetch(`/posts/${id}`, {
        method: "DELETE",
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {postData === undefined ? (
        <h1>Loading..</h1>
      ) : (
        <PostCardContainer>
          <PostCardContentContainer>
            <PostCardUserContainer>
              <PostCardDesc>{postData.desc}</PostCardDesc>
              {postData["img"] ? (
                <img
                  style={{ margin: "1em 0", width: "100%" }}
                  src={"http://localhost:5000/images/" + postData.img}
                />
              ) : null}
              <PostCardWrapper>
                <PostCardUserInfo>
                  <span style={{ color: "#fff" }}> Posted by: </span>
                  <PostCardUserImg
                    src={`
https://avatars.dicebear.com/api/identicon/${userPost.username}.svg
        `}
                  />
                  <p
                    style={{
                      color: "#fff",
                    }}
                  >
                    {userPost.username}
                  </p>
                </PostCardUserInfo>
              </PostCardWrapper>
            </PostCardUserContainer>
          </PostCardContentContainer>
          {/* LIKE DISLIKE */}
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

            {user.user._id === postData.userId ? (
              <PostCardButtonDelete onClick={() => deletePost(id)}>
                &#10060;
              </PostCardButtonDelete>
            ) : null}
          </PostCardBottomBar>
        </PostCardContainer>
      )}
    </>
  );
};

export default SinglePost;
