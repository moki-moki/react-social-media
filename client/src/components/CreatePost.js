import { useContext, useRef, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  FormBtnSubmit,
  FormInput,
  FormInputUpload,
  FormPlus,
  FormPlustBorder,
  ShareContainer,
  ShareForm,
} from "./styles/CreatePostStyles";

const CreatePost = () => {
  const [fileName, setFileName] = useState(null);
  const desc = useRef();
  const { user } = useContext(AuthContext);

  console.log(fileName);

  const redirect = () => (window.location = "/");

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user.user._id,
      desc: desc.current.value,
      // img: "",
    };

    if (fileName) {
      const data = new FormData();
      const fileNameStored = Date.now() + fileName.name;
      data.append("name", fileNameStored);
      data.append("file", fileName);
      console.log(fileNameStored);
      newPost.img = fileNameStored;

      console.log(newPost);
      try {
        await fetch("/upload", {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await fetch("/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc: newPost.desc,
          img: newPost.img,
          userId: newPost.userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      redirect();
    } catch (error) {
      console.log(error);
    }
  };

  const fileSubmitHandler = (e) => {
    e.preventDefault();
    console.log(`selected: ${e.target.files[0].name} `);
    setFileName(e.target.files[0].name);
  };

  return (
    <ShareContainer>
      <ShareForm onSubmit={submitHandler}>
        <FormInput
          placeholder={"Whats on your mind " + user.user.username + "?"}
          ref={desc}
        />
        <span style={{ marginTop: "1em " }}>Share Photo or a Video</span>
        <label htmlFor="file" style={{ margin: "1em 0" }}>
          <div style={{ textAlign: "center" }}>
            <FormPlustBorder>
              <FormPlus>&#43;</FormPlus>
            </FormPlustBorder>
          </div>
          <FormInputUpload
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setFileName(e.target.files[0])}
          />
        </label>
        {fileName && <img src={URL.createObjectURL(fileName)} alt="img" />}
        <FormBtnSubmit type="submit">Share</FormBtnSubmit>
      </ShareForm>
    </ShareContainer>
  );
};

export default CreatePost;
