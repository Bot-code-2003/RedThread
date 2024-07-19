import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { styles } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

// import { FileUploader } from "react-drag-drop-files";
// const fileTypes = ["JPG", "PNG"];

const ImageForm = ({ postID, setPostID }) => {
  // const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    postID ? state.posts.allPosts.find((post) => post._id === postID) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleChange = (file) => {
    setFile(file);
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
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Tags"
          name="tags"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />

        <img
          src={post.selectedFile}
          style={{ width: "50%", maxHeight: "450px", borderRadius: "5px" }}
          alt=""
        />

        <div className="p-2 mb-4">
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

export default ImageForm;
