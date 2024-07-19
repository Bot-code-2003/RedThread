import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../actions/posts";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      const postDetails = await dispatch(getPost(id));
      setPost(postDetails);
      console.log("postDetails: ", postDetails);
    };

    fetchPostDetails();
  }, [id, dispatch]);

  console.log("Post ID:", id);
  console.log("Post Details:", post);

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.message}</p>
          <img src={post.selectedFile} alt="" />
          {/* Render other post details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetails;
