import React, { useState } from "react";
import { styles } from "../../styles";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CleanTextForm = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const theme = localStorage.getItem("theme");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const [tagAlert, setTagAlert] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // New state for upload status
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

    if (!postData.tags) {
      setAlert(true);
      setTagAlert(true);
      return;
    }

    dispatch(createPost({ ...postData, name: user?.result?.name }));
    clear();
    navigate("/");
  };

  const handleTagsClick = () => {
    setAlert(true);
  };

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });

    setTagAlert(false);
    setUploadStatus(""); // Reset upload status
    setAlert(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData({ ...postData, selectedFile: reader.result });
        setUploadStatus("success"); // Set upload status to success
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dark:bg-gray-800 py-5 rounded shadow-md ">
      <form
        className="p-4 dark:text-white"
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
        <div className="mb-4">
          <input
            onClick={handleTagsClick}
            className={styles.input1}
            type="text"
            placeholder="Tags (comma separated)"
            name="tags"
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          {alert && (
            <Alert style={{ marginBottom: "10px" }} severity="info">
              Please use appropriate tags for better recommendations.
            </Alert>
          )}
        </div>

        <div
          className={`dark:text-white dark:bg-gray-800 file-upload-container ${uploadStatus} flex items-center`}
        >
          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-input" className="file-upload-label">
            <span className="dark:text-white file-upload-text flex items-center">
              {postData.selectedFile
                ? "File Uploaded Successfully"
                : "Upload an image"}
            </span>
          </label>
        </div>

        <div className="flex justify-between mb-2">
          <button className={styles.button} type="submit">
            Submit
          </button>
          <button className={styles.clearButton} onClick={clear} type="button">
            Clear
          </button>
        </div>
        {tagAlert && <Alert severity="error">Tags are required.</Alert>}
      </form>
    </div>
  );
};

export default CleanTextForm;
