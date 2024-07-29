import React, { useState, useEffect } from "react";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useDispatch } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { commentPost, deleteComment } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post?.comments) {
      setComments(post.comments);
    }
  }, [post]);

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addComment();
    }
  };

  const addComment = async () => {
    const commentAuthor = user.result.name;
    const newPost = await dispatch(
      commentPost(commentAuthor, comment, post._id)
    );
    setComments(newPost.comments);
    setComment("");
  };

  const handleCommentDelete = async (commentId) => {
    const updatedPost = await dispatch(deleteComment(post._id, commentId));
    setComments(updatedPost.comments);
  };

  return (
    <div className="dark:text-white">
      <div className="flex items-center gap-2">
        <ReviewsIcon style={{ color: "#b80000" }} />
        <h1 className="text-2xl m-0">Comments</h1>
      </div>
      <div className="flex flex-col">
        <textarea
          onKeyDown={handleEnterKey}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
          className="sm:w-[50%] w-full border border-gray h-28 bg-gray-100 dark:bg-gray-700 rounded-md p-2"
        />
        <button
          className="bg-gray-300 w-full hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 p-2 mt-1 sm:w-[50%] rounded-md"
          onClick={addComment}
        >
          Comment
        </button>
      </div>
      {comments?.length === 0 ? (
        <p className="text-gray-400 text-xl">No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="flex items-start gap-3 mb-2 mt-2">
            <div>
              <p className="text-gray-400 text-sm">
                {comment.author} &nbsp;{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p>{comment.comment}</p>
              <FavoriteBorderIcon
                fontSize="small"
                style={{ color: "#9ca3af" }}
              />
              {user.result.name === comment.author && (
                <button
                  onClick={() => handleCommentDelete(comment._id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;
