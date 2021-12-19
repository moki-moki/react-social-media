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
  const data = await req.json();
  return data;
};
