import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment-timezone";
import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material"; // Import CircularProgress for loading animation
import { styles } from "../../../styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setPostID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleHorizIconClick = () => {
    setPostID(post._id);
    navigate("/create");
  };

  const [imageWidth, setImageWidth] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading animation

  const checkImageResolution = (imgSrc) => {
    const img = new Image();
    img.onload = () => {
      setImageWidth(img.width);
    };
    img.src = imgSrc;
  };

  useEffect(() => {
    if (post.selectedFile) {
      checkImageResolution(post.selectedFile);
    }
  }, [post.selectedFile]);

  const handleLike = async () => {
    if (!user?.result) {
      alert("Please login to like");
      return;
    }

    setLoading(true); // Start loading animation

    try {
      await dispatch(likePost(post._id));
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="p-4 shadow-md w-full bg-white dark:bg-gray-800 rounded-lg">
      <div className="post-part-1 flex text-xs sm:text-lg items-center justify-between mb-1">
        <div className="flex">
          <p className="text-post-darker dark:text-gray-400">
            {post.name} &nbsp;
          </p>
          <p className="text-post-darker dark:text-gray-400">
            • {moment(post.createdAt).tz("Asia/Kolkata").fromNow()}
          </p>
        </div>
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            style={{ color: "gray" }}
            size="small"
            onClick={handleHorizIconClick}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        )}
      </div>
      <div className="post-part-2 text-sm mb-1">
        <div className="flex justify-between flex-col sm:flex-row">
          <h1 className={`${styles.titleText} dark:text-white`}>
            {post.title}
          </h1>
          <p className={`${styles.tag} w-auto`}>
            {post.tags.map((tag) => `#${tag} `)}
          </p>
        </div>
        <div
          className="text-black dark:text-gray-300"
          dangerouslySetInnerHTML={{
            __html: post.message.substring(0, 320) + "...",
          }}
        />
      </div>

      <div
        className="post-part-3 flex items-center justify-center mb-2"
        style={{
          borderRadius: "5px",
          position: "relative",
          width: "100%",
          height: "auto",
          overflow: "hidden",
        }}
      >
        {imageWidth < 600 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${post.selectedFile})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
              zIndex: 0,
            }}
          ></div>
        )}
        <img
          src={post.selectedFile}
          style={{
            maxWidth: imageWidth < 600 ? "100%" : "none",
            minWidth: imageWidth >= 600 ? "100%" : "none",
            borderRadius: imageWidth < 600 ? 0 : "5px",
            zIndex: 1,
          }}
          alt=""
        />
      </div>

      <div className="post-part-4 flex gap-2 mb-1">
        <Button
          size="small"
          style={{
            color: "white",
            backgroundColor: "#9ca3af",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onClick={handleLike}
          disabled={loading} // Disable button when user is not logged in or loading is true
        >
          {loading ? ( // Show CircularProgress while loading
            <CircularProgress size={20} color="inherit" />
          ) : post.likes.length > 0 ? (
            post.likes.find(
              (like) => like === (user?.result?.sub || user?.result?._id)
            ) ? (
              <FavoriteIcon style={{ color: "#ff4949" }} fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
          <p>{post.likes.length}</p>
        </Button>
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            style={{
              color: "white",
              backgroundColor: "#9ca3af",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default Post;
