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
} from "./styles/PostCardStyles";

const SinglePost = () => {
  const { id } = useParams();
  const history = useHistory();
  const [postData, setPostData] = useState();
  const [userPost, setUserPost] = useState({});

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const req = await fetch(`/posts/${id}`);
      const data = await req.json();
      setPostData(data);
      console.log(data);
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
    };
    fetchPostData();
  }, [postData]);

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
                <div>
                  {user.user._id === postData.userId ? (
                    <PostCardButtonDelete onClick={() => deletePost(id)}>
                      &#10060;
                    </PostCardButtonDelete>
                  ) : null}
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
