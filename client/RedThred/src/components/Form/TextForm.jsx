import React, { useEffect, useState } from "react";
import { styles } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextForm = ({ postID, setPostID }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    postID ? state.posts.allPosts.find((post) => post._id === postID) : null
  );

  // console.log("post:", post);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) {
      // console.log("Post received in useEffect:", post);
      setPostData({
        title: post.title || "",
        message: post.message || "",
        tags: post.tags || "",
        selectedFile: post.selectedFile || "",
      });
    }
  }, [post]);

  // console.log("postData before form submit:", postData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("Input change:", name, value); // Debugging input changes
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    // console.log("Quill change:", value); // Debugging Quill editor changes
    setPostData((prevState) => ({
      ...prevState,
      message: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Handling submit with postData:", postData); // Debugging form submission
    if (postID) {
      dispatch(updatePost(postID, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
    navigate("/");
  };

  const clear = () => {
    setPostID(null);
    setPostData({
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
