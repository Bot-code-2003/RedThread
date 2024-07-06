import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment-timezone";
import React from "react";
import { Button } from "@material-ui/core";
import { styles } from "../../../styles";

const Post = ({ post }) => {
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
        <Button style={{ color: "gray" }} size="small" onClick={() => {}}>
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div className="post-part-2 mb-1">
        <div className="flex justify-between">
          <h1 className={styles.titleText}>{post.title}</h1>
          <p className={styles.tag}>{post.tags.map((tag) => `#${tag} `)}</p>
        </div>
        <p className={styles.paragraphText}>{post.message}</p>
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
