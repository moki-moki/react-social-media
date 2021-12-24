import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { useParams } from "react-router";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import Loader from "./Loader";
import { fetchPostData, fetchProfileData } from "./utils/apiHelpers";

const Profile = () => {
  const { username, id } = useParams();
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState({});
  const { username: name, _id } = info;

  useEffect(() => {
    fetchProfileData(username, id).then((data) => setPosts(data));
  }, []);

  // get user info
  useEffect(() => {
    fetchPostData(id).then((data) => setInfo(data));
  }, []);

  return (
    <>
      {posts.length === 0 && name === undefined ? (
        <Loader />
      ) : (
        <>
          <ProfileInfo name={name} />
          <ProfilePosts id={id} posts={posts} />
        </>
      )}
    </>
  );
};

export default Profile;
