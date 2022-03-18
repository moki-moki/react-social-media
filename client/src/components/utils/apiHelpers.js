export const getPosts = async () => {
  try {
    const req = await fetch("/api/posts/");
    return await req.json();
  } catch (error) {
    console.log(error);
  }
};

export const likeHelper = async (id, myInit) => {
  try {
    return await fetch("/api/posts/" + id + "/like", myInit);
  } catch (error) {
    console.log(error);
  }
};

export const dislikeHelper = async (id, myInit) => {
  try {
    return await fetch("/api/posts/" + id + "/dislike", myInit);
  } catch (error) {
    console.log(error);
  }
};

export const deletePostHelper = async (id) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostData = async (userId) => {
  const req = await fetch(`/api/user?userId=${userId}`);
  return await req.json();
};

export const uploadPost = async (data) => {
  try {
    const req = await fetch("/api/upload", {
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
    await fetch("/api/posts/create", {
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
  } catch (error) {
    console.log(error);
  }
};

export const fetchProfileData = async (username, id) => {
  try {
    const req = await fetch(`/api/posts/profile/${username}/${id}`);
    return await req.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentHelper = async (id, postId) => {
  try {
    await fetch(`/api/posts/delete/${id}/${postId}`, {
      method: "DELETE",
    });
    await window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (postId, text, userId) => {
  try {
    await fetch(`/api/posts/comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        userId,
      }),
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (name, id) => {
  try {
    await fetch(`/api/user/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
      }),
    });
    localStorage.removeItem("user");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
