import React, { useState } from "react";
import TextForm from "./TextForm";
import ImageForm from "./ImageForm";
import { useSelector } from "react-redux";

const Form = ({ postID, setPostID }) => {
  console.log("postID: ", postID);
  const post = useSelector((state) =>
    // console.log("state: ", state),
    // console.log("state.posts: ", state.posts),
    state.posts.allPosts.find((post) => post._id === postID)
  );
  console.log("post: ", post);

  const [textForm, setTextForm] = useState(post.selectedFile ? false : true);
  const [imageForm, setImageForm] = useState(post.selectedFile ? true : false);

  const handleTextClick = () => {
    setTextForm(true);
    setImageForm(false);
  };
  const handleImageClick = () => {
    setTextForm(false);
    setImageForm(true);
  };
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          className={`${
            textForm ? "bg-gray-300" : "bg-gray-100"
          } p-2 hover:bg-gray-200`}
          onClick={handleTextClick}
        >
          Text
        </button>
        <button
          className={`${
            imageForm ? "bg-gray-300" : "bg-gray-100"
          } p-2 hover:bg-gray-200`}
          onClick={handleImageClick}
        >
          Image
        </button>
      </div>
      <div>
        {textForm ? (
          <TextForm postID={postID} setPostID={setPostID} />
        ) : (
          <ImageForm postID={postID} setPostID={setPostID} />
        )}
      </div>
    </div>
  );
};

export default Form;
