import React, { useState } from "react";
import ReviewsIcon from "@mui/icons-material/Reviews";

const CommentSection = () => {
  const [comments, setComments] = useState([1, 2, 3, 4]);
  const [comment, setComment] = useState("");
  const addComment = () => {};
  return (
    <div className="dark:text-white">
      <div className="flex items-center gap-2">
        <ReviewsIcon style={{ color: "#b80000" }} />
        <h1 className="text-2xl m-0">Comments</h1>
      </div>
      <div className="flex flex-col">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
          className="w-[50%] border border-gray h-28 bg-gray-100 dark:bg-gray-700 rounded-md p-2"
        />
        <button
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 p-2 mt-1 w-[50%] rounded-md"
          onClick={addComment}
        >
          Comment
        </button>
      </div>
      {comments.map((comment, i) => (
        <p>comment {i}</p>
      ))}
    </div>
  );
};

export default CommentSection;
