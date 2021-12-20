import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { useParams } from "react-router";
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
} from "./styles/PostCardStyles";
import NotificationSuccess from "./NotificationSuccess";

const Profile = () => {
  const username = useParams().username;
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState();
  const [openModal, setOpenModal] = useState(false);
  console.log(username);

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("/posts/profile/" + username);
      const data = await req.json();
      setPosts(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const deletePost = async (id) => {
    setOpenModal(!openModal);
    // try {
    //   await fetch(`/posts/${id}`, {
    //     method: "DELETE",
    //   });
    //   window.location.reload();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      {posts === undefined ? (
        <h1>Loading..</h1>
      ) : (
        <>
          {posts.map((post) => (
            <PostCardContainer key={post._id}>
              <PostCardContentContainer>
                <PostCardUserContainer>
                  <PostCardDesc>{post.desc}</PostCardDesc>
                  {post["img"] ? (
                    <img
                      style={{ margin: "1em 0", width: "100%" }}
                      src={"http://localhost:5000/images/" + post.img}
                    />
                  ) : null}
                  <PostCardWrapper>
                    <PostCardUserInfo>
                      <span style={{ color: "#fff" }}> Posted by: </span>
                      <PostCardUserImg
                        src={`
https://avatars.dicebear.com/api/identicon/${username}.svg
        `}
                      />
                      <p style={{ color: "#fff" }}>{username}</p>
                    </PostCardUserInfo>
                    <div>
                      {user.user._id === post.userId ? (
                        <PostCardButtonDelete
                          onClick={() => deletePost(post._id)}
                        >
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
                    </div>
                  </PostCardWrapper>
                </PostCardUserContainer>
              </PostCardContentContainer>
            </PostCardContainer>
          ))}
        </>
      )}
    </>
  );
};

export default Profile;
