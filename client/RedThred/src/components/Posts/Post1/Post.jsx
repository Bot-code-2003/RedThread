import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment-timezone";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { styles } from "../../../styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setPostID }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleHorizIconClick = () => {
    setPostID(post._id);
    navigate("/create");
  };

  const [imageWidth, setImageWidth] = useState(null);

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

  return (
    <div className="p-4 shadow-md">
      <div className="post-part-1 flex justify-between mb-1">
        <div className="flex">
          <p className="text-post-darker">{post.creator} &nbsp;</p>
          <p className="text-post-darker">
            {" "}
            • {moment(post.createdAt).tz("Asia/Kolkata").fromNow()}
          </p>
        </div>
        <Button
          style={{ color: "gray" }}
          size="small"
          onClick={handleHorizIconClick}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div className="post-part-2 mb-1">
        <div className="flex justify-between">
          <h1 className={styles.titleText}>{post.title}</h1>
          <p className={styles.tag}>{post.tags.map((tag) => `#${tag} `)}</p>
        </div>
        <div
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
          overflow: "hidden", //Hides the blur effect that crawls ot of div.
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
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <ThumbUpAltIcon fontSize="small" />
          <p>{post.likeCount}</p>
        </Button>
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
      </div>
    </div>
  );
};

export default Post;
