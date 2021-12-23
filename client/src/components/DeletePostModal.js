import { useRef, useEffect } from "react";
import {
  Close,
  DeleteModalContainer,
  DeleteModalMainContainer,
} from "./styles/DeleteModalStyles/DeleteModalStyles";
import { PostCardButtonDelete } from "./styles/PostCardStyles";
import { deletePostHelper } from "./utils/apiHelpers";

const DeletePostModal = ({ id, setOpenModal, openModal }) => {
  const deletePost = async (id) => {
    await deletePostHelper(id);
    await window.location.reload();
  };

  const closeModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <DeleteModalMainContainer ref={modalRef}>
      <DeleteModalContainer>
        <Close onClick={() => closeModal()}>&#10060;</Close>
        <h1>Are you sure you want to delete this post?</h1>
        <PostCardButtonDelete onClick={() => deletePost(id)}>
          Delete &#128169;
        </PostCardButtonDelete>
      </DeleteModalContainer>
    </DeleteModalMainContainer>
  );
};

export default DeletePostModal;
