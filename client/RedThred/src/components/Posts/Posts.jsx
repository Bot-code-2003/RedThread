import React from "react";
import Post from "./Post1/Post";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Posts = ({ setPostID }) => {
  const posts = useSelector((state) => state.posts);
  console.log("posts: ", posts);
  return !posts.length ? (
    <CircularProgress style={{ margin: "25% 50%" }} />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={6} lg={12}>
          <Post post={post} setPostID={setPostID} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
