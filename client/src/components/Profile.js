import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import Loader from "./Loader";
import { fetchPostData, fetchProfileData } from "./utils/apiHelpers";

const Profile = () => {
  const { username, id } = useParams();
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState({});
  const { username: name } = info;

  useEffect(() => {
    fetchProfileData(username, id).then((data) => setPosts(data));
    fetchPostData(id).then((data) => setInfo(data));
  }, [id, username]);

  // get user info
  // useEffect(() => {
  // }, []);

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
