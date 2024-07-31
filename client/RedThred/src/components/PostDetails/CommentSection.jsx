// CommentSection.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { commentPost, deleteComment } from "../../actions/posts";
import moment from "moment-timezone";
import AddCommentIcon from "@mui/icons-material/AddComment";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post?.comments) {
      setComments([...post.comments].reverse());
    }
  }, [post, dispatch]);

  // const handleEnterKey = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     addComment();
  //   }
  // };

  const addComment = async () => {
    const commentAuthor = user.result.name;
    const authorId = user.result._id || user.result.sub;
    const newComment = {
      author: commentAuthor,
      authorId: authorId,
      comment: comment,
      createdAt: new Date().toISOString(), // Use current date for optimistic UI
    };
    setComments([newComment, ...comments]);
    setComment("");
    await dispatch(commentPost(commentAuthor, authorId, comment, post._id));
  };

  const handleCommentDelete = async (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
    await dispatch(deleteComment(post._id, commentId));
  };

  return (
    <div className="dark:text-white w-full">
      <div className="flex items-center mb-1 gap-2">
        <AddCommentIcon sx={{ color: "#b80000" }} />
        <h1 className="text-2xl m-0">Comments</h1>
      </div>
      {user && (
        <div className="flex flex-col w-full sm:w-[50%]">
          <textarea
            // onKeyDown={handleEnterKey}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment"
            className="w-full text-black dark:text-white border border-gray h-28 bg-gray-100 dark:bg-gray-600 rounded-md p-2"
          />
          <button
            className="bg-gray-300 dark:bg-gray-700 w-full hover:bg-gray-400 p-2 mt-2 mb-4 rounded-md"
            onClick={addComment}
          >
            Comment
          </button>
        </div>
      )}
      {comments.length === 0 ? (
        <p className="text-gray-400">No comments yet</p>
      ) : (
        comments.map((comment, i) => (
          <div
            key={i}
            className="flex items-start  border-b dark:border-gray-700 border-gray-300 pb-2 gap-3 mb-2 mt-2"
          >
            <div className="w-[40px] h-[40px] flex items-center border border-gray-500 justify-center rounded-full">
              <h3>{comment.author.charAt(0).toUpperCase()}</h3>
            </div>
            <div>
              <p className="text-gray-400 text-sm">
                {comment.author} • {moment(comment.createdAt).fromNow()}
              </p>
              <p>{comment.comment}</p>
              {(user?.result?._id === comment.authorId ||
                user?.result?.sub === comment.authorId ||
                user?.result?._id === import.meta.env.VITE_ADMIN_ID) && (
                <div className="flex gap-2">
                  <p
                    className="hover:cursor-pointer text-sm"
                    onClick={() => handleCommentDelete(comment._id)}
                    style={{ color: "red" }}
                  >
                    delete
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;
