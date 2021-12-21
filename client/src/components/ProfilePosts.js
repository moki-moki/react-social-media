import Post from "./Post";

const ProfilePosts = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default ProfilePosts;
