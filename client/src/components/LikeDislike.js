import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  PostCardButtonsDislike,
  PostCardButtonsLike,
} from "./styles/PostCardStyles";
import { dislikeHelper, likeHelper } from "./utils/apiHelpers";

const LikeDislike = ({ likeArr, dislikeArr, id }) => {
  const [like, setLike] = useState(likeArr.length);
  const [dislike, setDislike] = useState(dislikeArr.length);
  const [isDislike, setIsDislike] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { user } = useContext(AuthContext);

  const myInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user.user._id,
    }),
  };

  useEffect(() => {
    setIsLiked(likeArr.includes(user.user._id));
    setIsDislike(dislikeArr.includes(user.user._id));
  }, [user.user._id, likeArr, dislikeArr]);

  // like func
  const likeHandle = async () => {
    likeHelper(id, myInit);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // dislike func
  const dislikeHandle = async () => {
    dislikeHelper(id, myInit);
    setDislike(isDislike ? dislike - 1 : dislike + 1);
    setIsDislike(!isDislike);
  };

  return (
    <>
      <PostCardButtonsLike
        style={{ backgroundColor: isLiked ? "#09c372" : "transparent" }}
        onClick={likeHandle}
      >
        &#128077; {like > 0 ? like : null}
      </PostCardButtonsLike>
      <PostCardButtonsDislike
        style={{
          backgroundColor: isDislike ? "#ff3860" : "transparent",
        }}
        onClick={dislikeHandle}
      >
        &#128169;{dislike > 0 ? dislike : null}
      </PostCardButtonsDislike>
    </>
  );
};

export default LikeDislike;
