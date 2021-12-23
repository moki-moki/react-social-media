import { useEffect, useState } from "react";
import Post from "./Post";
import { BtnArrowUp } from "./styles/BackToTopBtnStyles";
import Loader from "./Loader";
import { getPosts } from "./utils/apiHelpers";

const HomepageLayout = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const getData = async () => {
    //   const req = await fetch("/posts/");
    //   const res = await req.json();
    //   setData(
    //     res.sort((p1, p2) => {
    //       return new Date(p2.createdAt) - new Date(p1.createdAt);
    //     })
    //   );
    // };
    // getData();
    getPosts().then((data) =>
      setData(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      )
    );
  }, []);

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {data.length === 0 ? (
        <Loader />
      ) : (
        <>
          {data.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </>
      )}
      <BtnArrowUp onClick={handleToTop}>^</BtnArrowUp>
    </div>
  );
};

export default HomepageLayout;
