import { useEffect, useState } from "react";
import Post from "./Post";

const HomepageLayout = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const req = await fetch("/posts/");
      const res = await req.json();
      setData(res);
    };
    getData();
  }, []);
  return (
    <div>
      {data.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default HomepageLayout;
