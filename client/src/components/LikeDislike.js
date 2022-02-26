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

  console.log(likeArr)


  // like func
  const likeHandle = async () => {

    // check if user disliked post
    if (isDislike === true) {

      likeHelper(id, myInit);
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);

      // sets isDislike to false and removes the dislike
      dislikeHelper(id, myInit);
      setDislike(dislike - 1);
      setIsDislike(!isDislike);

    } else {

      likeHelper(id, myInit);
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    }

  };

  // dislike func
  const dislikeHandle = async () => {

    // check if user already liked a post
    if (isLiked === true) {

      // sets isLiked to false and removes the like 
      likeHelper(id, myInit);
      setLike(like - 1);
      setIsLiked(!isLiked);


      dislikeHelper(id, myInit);
      setDislike(isDislike ? dislike - 1 : dislike + 1);
      setIsDislike(!isDislike);
    } else {

      dislikeHelper(id, myInit);
      setDislike(isDislike ? dislike - 1 : dislike + 1);
      setIsDislike(!isDislike);
    }
  };

  return (
    <>
      <PostCardButtonsLike
        onClick={likeHandle}
        isLiked={isLiked}
      >
        &#128077; {like > 0 ? like : null}
      </PostCardButtonsLike>
      <PostCardButtonsDislike
        isDisliked={isDislike}
        onClick={dislikeHandle}
      >
        &#128169;{dislike > 0 ? dislike : null}
      </PostCardButtonsDislike>
    </>
  );
};

export default LikeDislike;
