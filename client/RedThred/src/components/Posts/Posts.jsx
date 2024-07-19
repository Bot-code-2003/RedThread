import React from "react";
import Post from "./Post1/Post";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import PostSkeleton from "../PostSkeleton";

const Posts = ({ setPostID, isSearched }) => {
  const posts = useSelector((state) =>
    isSearched ? state.posts.searchResults : state.posts.allPosts
  );
  console.log("posts: ", posts);
  return !posts.length ? (
    <PostSkeleton />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={12} lg={12}>
          <Post post={post} setPostID={setPostID} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
