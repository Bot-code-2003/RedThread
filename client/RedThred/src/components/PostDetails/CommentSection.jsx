// CommentSection.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { commentPost, deleteComment } from "../../actions/posts";
import moment from "moment-timezone";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post?.comments) {
      setComments(post.comments);
    }
  }, [post, dispatch]);

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
    await dispatch(deleteComment(post._id, commentId));
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  };

  return (
    <div className="dark:text-white w-full">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl m-0">Comments</h1>
      </div>
      {user && (
        <div className="flex flex-col w-full sm:w-[50%]">
          <textarea
            onKeyDown={handleEnterKey}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment"
            className="w-full border border-gray h-28 bg-gray-100 rounded-md p-2"
          />
          <button
            className="bg-gray-300 w-full hover:bg-gray-400 p-2 mt-1 rounded-md"
            onClick={addComment}
          >
            Comment
          </button>
        </div>
      )}
      {comments.length === 0 ? (
        <p className="text-gray-400 text-xl">No comments yet</p>
      ) : (
        comments.map((comment, i) => (
          <div key={i} className="flex items-start gap-3 mb-2 mt-2">
            <div>
              <p className="text-gray-400 text-sm">
                {comment.author} •{" "}
                {moment(comment.createdAt).tz("Asia/Kolkata").fromNow()}
              </p>
              <p>{comment.comment}</p>
              <div className="flex gap-2">
                <DeleteIcon
                  onClick={() => handleCommentDelete(comment._id)}
                  fontSize="small"
                  style={{ color: "#9ca3af" }}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;
