import React, { useEffect, useState } from "react";
import { styles } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    creator: "",
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

    dispatch(createPost(postData));
    clear();
    navigate("/");
  };

  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <div>
      <form
        className="shadow-md p-4"
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
      >
        <h1 className={`${styles.titleText}`}>Weave a Thread</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="Creator"
          name="creator"
          value={postData.creator}
          onChange={handleInputChange}
        />
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
          onChange={handleInputChange}
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

export default TextForm;
