import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import Loader from "./Loader";
import { fetchPostData, fetchProfileData } from "./utils/apiHelpers";
import { AuthContext } from "./context/AuthContext";

const Profile = () => {
  const { username, id } = useParams();
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState({});
  const { username: name } = info;
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    fetchProfileData(username, id).then((data) => setPosts(data));
    fetchPostData(id).then((data) => setInfo(data));
  }, [id, username, user]);

  return (
    <>
      {posts.length === 0 && name === undefined ? (
        <Loader />
      ) : (
        <>
          <ProfileInfo id={id} userId={user.user._id} name={name} />
          <ProfilePosts id={id} posts={posts} />
        </>
      )}
    </>
  );
};

export default Profile;
