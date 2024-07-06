import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment-timezone";
import React from "react";
import { Button } from "@mui/material";
import { styles } from "../../../styles";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setPostID }) => {
  const navigate = useNavigate();
  const handleHorizIconClick = () => {
    setPostID(post._id);
    navigate("/create");
  };

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
      <div className="post-part-3 mb-1">
        <img
          src={post.selectedFile}
          style={{ width: "100%", maxHeight: "450px", borderRadius: "5px" }}
          alt=""
        />
      </div>
      <div className="post-part-4 flex gap-2 mb-1">
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltIcon fontSize="small" />
          Like
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Post;
