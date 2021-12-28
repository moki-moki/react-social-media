import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "./context/AuthContext";
import DeletePostModal from "./DeletePostModal";
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
import Loader from "./Loader";
import { dislikeHelper, likeHelper } from "./utils/apiHelpers";
import Comments from "./Comments";
import {
  SinglePostCommentBtn,
  SinglePostPostedBy,
  SinglePostUsername,
} from "./styles/SinglePostStyles";
import CommentInput from "./CommentInput";

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [postData, setPostData] = useState({});
  const [userPost, setUserPost] = useState({});
  // like func
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [isDislike, setIsDislike] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  // delete
  const [openModal, setOpenModal] = useState(false);
  // comment input
  const [showInput, setShowInput] = useState(false);

  const myInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user.user._id,
    }),
  };

  // show input
  const handleShowInput = () => {
    setShowInput(!showInput);
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
  }, [id]);

  // like dislike funk
  useEffect(() => {
    setIsLiked(postData ? 0 : postData.likes.includes(user.user._id));
    setIsDislike(postData ? 0 : postData.dislikes.includes(user.user._id));
  }, [user.user._id, postData.likes, postData.dislikes, postData]);

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
  }, [postData, id]);

  // deletes a post duuh...
  const deletePost = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      {postData === undefined ? (
        <Loader />
      ) : (
        <PostCardContainer>
          <PostCardContentContainer>
            <PostCardUserContainer>
              <PostCardDesc>{postData.desc}</PostCardDesc>
              {postData["img"] ? (
                <img
                  style={{ margin: "1em 0", width: "100%" }}
                  src={"http://localhost:5000/images/" + postData.img}
                  alt="alt"
                />
              ) : null}
              <PostCardWrapper>
                <PostCardUserInfo
                  to={`/profile/${userPost.username}/${userPost._id}`}
                >
                  <SinglePostPostedBy> Posted by: </SinglePostPostedBy>
                  <PostCardUserImg
                    src={`
https://avatars.dicebear.com/api/identicon/${userPost.username}.svg
        `}
                  />
                  <SinglePostUsername>{userPost.username}</SinglePostUsername>
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
              {/* comments */}
              <SinglePostCommentBtn
                disabled={showInput === true}
                onClick={() => handleShowInput()}
              >
                &#128172;
              </SinglePostCommentBtn>
            </PostCardBtnContainer>
            {user.user._id === postData.userId ? (
              <PostCardButtonDelete onClick={() => deletePost(id)}>
                &#10060;
              </PostCardButtonDelete>
            ) : null}
          </PostCardBottomBar>
          {/* Comment input */}
          {showInput ? (
            <CommentInput
              userId={user.user._id}
              postId={id}
              setShowInput={setShowInput}
              showInput={showInput}
            />
          ) : null}

          {/* DELETE */}
          {openModal ? (
            <DeletePostModal
              setOpenModal={setOpenModal}
              openModal={openModal}
              id={postData._id}
            />
          ) : null}
        </PostCardContainer>
      )}
      {/* displaying comment */}
      {postData.comments === undefined ? null : (
        <Comments comments={postData.comments} />
      )}
    </>
  );
};

export default SinglePost;
