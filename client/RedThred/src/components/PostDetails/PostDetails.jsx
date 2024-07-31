import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../actions/posts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AssistantIcon from "@mui/icons-material/Assistant";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import PostSkeleton from "../PostSkeleton";
import { useNavigate, Link } from "react-router-dom";
import { getPostBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import { CircularProgress } from "@mui/material";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const recommendedPosts = useSelector((state) => state.posts.recommendedPosts);

  useEffect(() => {
    dispatch(getPostBySearch(post?.title));
  }, [post?.title, dispatch]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      const postDetails = await dispatch(getPost(id));
      setPost(postDetails);
    };

    fetchPostDetails();
  }, [id, dispatch]);

  const checkImageResolution = (imgSrc) => {
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      console.log(width, height); // Log dimensions directly from the `onload` event

      setImageWidth(width);
      setImageHeight(height);
    };
    img.src = imgSrc;
  };

  useEffect(() => {
    if (post?.selectedFile) {
      checkImageResolution(post.selectedFile);
    }
  }, [post?.selectedFile]); // Depend on post.selectedFile

  return (
    <Grid container>
      <Grid item xs={12} lg={12}>
        {post ? (
          <div className="p-4 flex flex-col items-center w-full bg-white dark:bg-transparent dark:text-white rounded-lg">
            <div className="flex gap-5 items-start mb-3">
              <h2
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
                className="text-2xl sm:text-4xl text-center"
              >
                {post.title}
              </h2>
              <div className="hidden sm:flex gap-1 items-center border border-gray-500 rounded py-1 px-4 ">
                {post.likes.length > 0 ? (
                  post.likes.find(
                    (like) => like === (user?.result?.sub || user?.result?._id)
                  ) ? (
                    <FavoriteIcon
                      style={{ color: "#ff4949" }}
                      fontSize="medium"
                    />
                  ) : (
                    <FavoriteBorderIcon fontSize="medium" />
                  )
                ) : (
                  <FavoriteBorderIcon fontSize="medium" />
                )}
                <p className="text-xl">{post.likes.length}</p>
              </div>
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
              {(imageWidth < 600 || imageHeight > 600) && (
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
                  maxWidth: imageWidth < 600 ? "100%" : "600px",
                  maxHeight: imageHeight < 600 ? "100%" : "600px",
                  borderRadius: imageWidth < 600 ? 0 : "5px",
                  zIndex: 1,
                }}
                alt=""
              />
            </div>
            <div
              className="text-black mt-3 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: post?.message || "",
              }}
            />

            {/* Render other post details here */}
          </div>
        ) : (
          <PostSkeleton />
        )}
      </Grid>

      <div className="border-b border-gray-200 mb-2 w-full" />
      <div className="flex items-center mb-1 gap-2">
        <AssistantIcon color="primary" />
        <h1 className="dark:text-white  text-2xl ">Recommended Posts</h1>
      </div>
      <Grid container style={{ overflow: "auto", marginBottom: "1rem" }}>
        {recommendedPosts.length === 0 ? (
          <p className="text-gray-400">No recommended posts</p>
        ) : (
          recommendedPosts?.map((post) => (
            <Grid item key={post._id}>
              <Link
                key={post._id}
                onClick={(e) => (
                  e.preventDefault(), navigate(`/postDetails/${post._id}`)
                )}
              >
                <div className="flex flex-wrap item-center py-1 px-2 rounded-sm bg-gray-300 hover:bg-gray-400 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700">
                  <h3>
                    {post.title.length > 25
                      ? post.title.slice(0, 25) + "..."
                      : post.title}
                  </h3>
                </div>
              </Link>
            </Grid>
          ))
        )}
        <div className="border-b border-gray-200 mb-2 mt-2 w-full" />
        <Grid item xs={12} lg={12}>
          <CommentSection post={post} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PostDetails;
