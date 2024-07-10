import React, { useEffect, useState } from "react";
import { styles } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextForm = ({ postID, setPostID }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    postID ? state.posts.find((post) => post._id === postID) : null
  );

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleQuillChange = (value) => {
    setPostData({ ...postData, message: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postID) {
      dispatch(updatePost(postID, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
    navigate("/");
  };

  const clear = () => {
    setPostID(null);
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
        <h1 className={`${styles.titleText}`}>Edit Thread</h1>
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
