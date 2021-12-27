import {
  Close,
  DeleteModalContainer,
  DeleteModalMainContainer,
} from "./styles/DeleteModalStyles/DeleteModalStyles";
import { PostCardButtonDelete } from "./styles/PostCardStyles";
import { deleteCommentHelper } from "./utils/apiHelpers";

const DeleteCommentModal = ({ id, setOpenModal, openModal, postId }) => {
  const deleteComment = async (id, postId) => {
    await deleteCommentHelper(id, postId);
  };

  const closeModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <DeleteModalMainContainer>
      <DeleteModalContainer>
        <Close onClick={() => closeModal()}>&#10060;</Close>
        <h1>Are you sure you want to delete this post?</h1>
        <PostCardButtonDelete onClick={() => deleteComment(postId, id)}>
          Delete &#128169;
        </PostCardButtonDelete>
      </DeleteModalContainer>
    </DeleteModalMainContainer>
  );
};

export default DeleteCommentModal;
