import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  PostCardContainer,
  PostCardContentContainer,
  PostCardDesc,
  PostCardUserContainer,
  PostCardWrapper,
  PostCardUserInfo,
  PostCardUserImg,
} from "./styles/PostCardStyles";

const SinglePost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const [userPost, setUserPost] = useState({});

  useEffect(() => {
    const getData = async () => {
      const req = await fetch(`/posts/${id}`);
      const data = await req.json();
      setPostData(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      const req = await fetch(
        `/user?userId=${postData ? postData.userId : id}`
      );
      const data = await req.json();
      setUserPost(data);
      console.log(data);
    };
    fetchPostData();
  }, [postData]);

  console.log(postData);
  return (
    <>
      {postData === undefined ? (
        <h1>Loading..</h1>
      ) : (
        <PostCardContainer>
          <PostCardContentContainer>
            <PostCardUserContainer>
              <PostCardDesc>{postData.desc}</PostCardDesc>
              <img
                style={{ margin: "1em 0" }}
                src={"http://localhost:5000/images/" + postData.img}
              />
              <PostCardWrapper>
                <PostCardUserInfo>
                  <span style={{ color: "#fff" }}> Posted by: </span>
                  <PostCardUserImg
                    src={`
https://avatars.dicebear.com/api/identicon/${userPost.username}.svg
        `}
                  />
                  <p style={{ color: "#fff" }}>{userPost.username}</p>
                </PostCardUserInfo>
                <div>
                  <button>Like</button>
                  <button>Dislike</button>
                </div>
              </PostCardWrapper>
            </PostCardUserContainer>
          </PostCardContentContainer>
        </PostCardContainer>
      )}
    </>
  );
};

export default SinglePost;
