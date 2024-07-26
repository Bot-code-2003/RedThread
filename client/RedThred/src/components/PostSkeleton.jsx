import React from "react";
import { Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const PostSkeleton = () => {
  return (
    <>
      <div className="max-w-[100%] h-auto p-7 bg-white dark:bg-gray-800 rounded-lg animate-pulse">
        <div className="post-part-1 flex text-xs sm:text-lg items-center justify-between mb-1">
          <div className="flex">
            <div className="text-post-darker dark:text-gray-400 bg-gray-200 h-4 w-20 rounded-md mb-1"></div>
            <div className="text-post-darker dark:text-gray-400 bg-gray-200 h-4 w-24 rounded-md ml-1"></div>
          </div>
          <div className="bg-gray-200 h-6 w-6 rounded-full"></div>
        </div>
        <div className="post-part-2 text-sm mb-1">
          <div className="flex justify-between flex-col sm:flex-row">
            <div className="titleText dark:text-white bg-gray-200 h-6 w-60 rounded-md mb-1"></div>
            <div className="tag bg-gray-200 h-4 w-24 rounded-md ml-1"></div>
          </div>
          <div className="text-black dark:text-gray-300 bg-gray-200 h-6  rounded-md"></div>
        </div>

        <div className="post-part-3 flex items-center justify-center mb-2">
          <div className="bg-gray-200 h-60 w-full rounded-md"></div>
        </div>

        <div className="post-part-4 flex gap-2 mb-1">
          <Button
            size="small"
            style={{
              backgroundColor: "#9ca3af",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
            disabled
          >
            <CircularProgress size={20} color="inherit" />
            <p>0</p>
          </Button>
          <Button
            size="small"
            style={{
              backgroundColor: "#9ca3af",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
            disabled
          >
            <div className="bg-gray-200 h-6 w-20 rounded-md"></div>
            <DeleteIcon fontSize="small" />
            <div className="bg-gray-200 h-6 w-16 rounded-md"></div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PostSkeleton;
