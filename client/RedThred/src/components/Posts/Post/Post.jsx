import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment-timezone";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { styles } from "../../../styles";
import { deletePost, likePost } from "../../../actions/posts";
import { useMediaQuery } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

const Post = ({ post, setPostID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const isMobile = useMediaQuery("(max-width: 600px)");

  const [imageWidth, setImageWidth] = useState(null);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleHorizIconClick = (e) => {
    e.preventDefault();
    // setShowAlert(true);
    // setTimeout(() => {
    //   setShowAlert(false);
    // }, 2000);
    setPostID(post._id);
    navigate("/create");
  };

  const handleLinkClick = async (e) => {
    e.preventDefault();
    navigate(`/postDetails/${post._id}`);
  };

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

    setLoadingLike(true);

    try {
      await dispatch(likePost(post._id));
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setLoadingLike(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setLoadingDelete(true);

    try {
      await dispatch(deletePost(post._id));
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="p-4 shadow-md bg-white dark:bg-gray-800 rounded-lg relative">
      {showAlert && (
        <Alert
          severity="info"
          sx={{ position: "absolute", top: -25, right: 0 }}
        >
          Edit option temporarily disabled
        </Alert>
      )}
      <div className="post-part-1 flex text-xs sm:text-lg items-center justify-between mb-1">
        <div className="flex">
          <p className="text-post-darker text-sm dark:text-gray-400">
            {post.name} &nbsp;
          </p>
          <p className="text-post-darker text-sm dark:text-gray-400">
            • {moment(post.createdAt).tz("Asia/Kolkata").fromNow()}
          </p>
        </div>
        {user?.result?._id === import.meta.env.VITE_ADMIN_ID && (
          <Button
            style={{ color: "gray" }}
            size="small"
            className="disabled-link"
            onClick={handleHorizIconClick}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        )}
      </div>
      <div className="post-part-2 text-sm mb-1">
        <div className="flex justify-between flex-col sm:flex-row">
          <Link
            className={`${styles.titleText} max-w-[100%] hover:underline dark:text-white`}
            to={`/postDetails/${post._id}`}
            onClick={handleLinkClick}
          >
            <h1
              style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              className={`${styles.titleText} max-w-[100%] hover:underline dark:text-white`}
            >
              {post.title}
            </h1>
          </Link>

          <p className={`${styles.tag} w-auto`}>
            {post.tags.map((tag) => `#${tag} `)}
          </p>
        </div>
        <div
          className={`${styles.paragraphText} mt-1 dark:text-gray-300`}
          dangerouslySetInnerHTML={{
            __html: post?.message
              ? isMobile
                ? post.message.substring(0, 100) + "..."
                : post.message.length > 250
                ? post.message.substring(0, 250) + "..."
                : post.message
              : "",
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
        <button
          className="p-2 rounded px-4 dark:bg-gray-700 bg-gray-300"
          size="small"
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onClick={handleLike}
          disabled={loadingLike}
        >
          {loadingLike ? (
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
        </button>
        <button
          className="p-2 rounded px-4 dark:bg-gray-700 bg-gray-300"
          size="small"
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          // onClick={handleLike}
          // disabled={loadingLike}
        >
          <CommentIcon fontSize="small" />
          <p>{post.comments.length}</p>
        </button>
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator ||
          user?.result?._id === import.meta.env.VITE_ADMIN_ID) && (
          <button
            className="p-2 rounded px-4 dark:bg-gray-700 bg-gray-300"
            size="small"
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
            onClick={handleDelete}
            disabled={loadingDelete}
          >
            {loadingDelete ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <>
                <DeleteIcon fontSize="small" />
                Delete
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
