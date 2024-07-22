import React, { useEffect, useState } from "react";
import { styles } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CleanTextForm = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleQuillChange = (value) => {
    setPostData({ ...postData, message: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ ...postData, name: user?.result?.name }));
    clear();
    navigate("/");
  };

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <div className="dark:bg-gray-800 py-5 rounded shadow-md ">
      <form
        className="p-4"
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
      >
        <h1 className={`${styles.titleText} dark:text-white`}>
          Weave a Thread
        </h1>

        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          name="title"
          value={postData.title}
          onChange={handleInputChange}
        />

        <ReactQuill
          theme="snow"
          value={postData.message}
          onChange={handleQuillChange}
          style={{
            width: "100%",
            color: "black",
            backgroundColor: "white",
            fontWeight: "normal",
            marginBottom: "15px",
          }}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Tags"
          name="tags"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className="flex justify-between">
          <button className={styles.button} type="submit">
            Submit
          </button>
          <button className={styles.clearButton} onClick={clear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CleanTextForm;
