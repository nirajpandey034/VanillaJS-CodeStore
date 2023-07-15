import axios from "axios";
const submitComment = async ({
  id,
  title,
  comment,
  setComment,
  setOpen,
  setOpenEditModal,
}: {
  id: String;
  title: String;
  comment: String;
  setComment: any;
  setOpen: any;
  setOpenEditModal: any;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}comment/add_comment`,
      {
        id,
        title,
        comment,
      }
    );
    if (response.data.success) {
      alert("Comment submitted successfull");
      setComment("");
      setOpen(false);
      setOpenEditModal(false);
    } else alert("Comment submission failed, Please try again");
  } catch (err) {
    console.log(err);
  }
};

export default submitComment;
