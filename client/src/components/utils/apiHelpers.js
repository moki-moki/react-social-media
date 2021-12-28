export const getPosts = async () => {
  try {
    const req = await fetch("/posts/");
    return await req.json();
  } catch (error) {
    console.log(error);
  }
};

export const likeHelper = async (id, myInit) => {
  try {
    return await fetch("/posts/" + id + "/like", myInit);
  } catch (error) {
    console.log(error);
  }
};

export const dislikeHelper = async (id, myInit) => {
  try {
    return await fetch("/posts/" + id + "/dislike", myInit);
  } catch (error) {
    console.log(error);
  }
};

export const deletePostHelper = async (id) => {
  try {
    await fetch(`/posts/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostData = async (userId) => {
  const req = await fetch(`/user?userId=${userId}`);
  console.log(req);
  return await req.json();
};

export const uploadPost = async (data) => {
  try {
    const req = await fetch("/upload", {
      method: "POST",
      body: data,
    });
    return await req.json();
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (desc, img, id) => {
  try {
    const req = await fetch("/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        desc: desc,
        img: img,
        userId: id,
      }),
    });
    const res = req.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const fetchProfileData = async (username, id) => {
  try {
    const req = await fetch(`/posts/profile/${username}/${id}`);
    return await req.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentHelper = async (id, postId) => {
  try {
    await fetch(`/posts/delete/${id}/${postId}`, {
      method: "DELETE",
    });
    await window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (postId, text, userId) => {
  try {
    const req = await fetch(`/posts/comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        userId,
      }),
    });
    const res = await req.json();
    console.log(res);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
