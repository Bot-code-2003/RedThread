import React, { useState } from "react";
import FileBase from "react-file-base64";
import { styles } from "../../styles";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

// const fileTypes = ["JPG", "PNG"];

const CleanImageForm = () => {
  // const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

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

  // const handleChange = (file) => {
  //   setFile(file);
  // };

  return (
    <div className="dark:bg-gray-800 rounded py-5 shadow-md">
      <form
        className=" p-4"
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
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
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

        <div className="p-2 mb-4 dark:text-white">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        {/* 
        <div className="p-2 mb-4">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
            multiple={false}
          />
        </div> */}

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

export default CleanImageForm;
