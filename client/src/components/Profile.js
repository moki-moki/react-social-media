import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { useParams } from "react-router";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";

const Profile = () => {
  const { username, id } = useParams();
  console.log(useParams());
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState({});
  const { username: name, _id } = info;

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch(`/posts/profile/${username}/${id}`);
      const data = await req.json();
      setPosts(data);
      console.log(data);
    };
    fetchData();
  }, []);

  // get user info
  useEffect(() => {
    const getUser = async () => {
      const request = await fetch(`/user?userId=${id}`);
      const res = await request.json();
      setInfo(res);
    };
    getUser();
  }, []);

  return (
    <>
      {posts === undefined ? (
        <h1>Loading..</h1>
      ) : (
        <>
          <ProfileInfo user={user} name={name} id={_id} />
          <ProfilePosts id={id} posts={posts} />
        </>
      )}
    </>
  );
};

export default Profile;
