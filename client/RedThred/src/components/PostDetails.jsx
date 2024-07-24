import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../actions/posts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import PostSkeleton from "./PostSkeleton";
import { useNavigate, Link } from "react-router-dom";
import { getPostBySearch } from "../actions/posts";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
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
      console.log("postDetails: ", postDetails);
    };

    fetchPostDetails();
  }, [id, dispatch]);

  const checkImageResolution = (imgSrc) => {
    const img = new Image();
    img.onload = () => {
      setImageWidth(img.width);
    };
    img.src = imgSrc;
  };

  useEffect(() => {
    if (post?.selectedFile) {
      checkImageResolution(post.selectedFile);
    }
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={10}>
        {post ? (
          <div className="p-4 flex flex-col items-center w-full bg-white dark:bg-transparent dark:text-white rounded-lg">
            <div className="flex gap-5 items-center mb-3">
              <h2 className="text-4xl">{post.title}</h2>
              <div className="flex gap-1 items-center border border-gray-500 rounded py-1 px-4 ">
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
              className="text-black dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: post?.message ? post.message : "",
              }}
            />

            <div
              className="post-part-3 flex items-center justify-center mb-2"
              style={{
                borderRadius: "5px",
                position: "relative",
                width: "80%",
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

            {/* Render other post details here */}
          </div>
        ) : (
          <PostSkeleton />
        )}
      </Grid>
      <Grid item lg={2} style={{ border: "1px solid black" }}>
        <div className="w-full flex gap-5 flex-wrap item-center">
          <h1 className="underline">Recommended Posts</h1>

          {recommendedPosts?.map((post) => (
            <Link
              key={post._id}
              onClick={(e) => (
                e.preventDefault(), navigate(`/postDetails/${post._id}`)
              )}
            >
              <h3 className="hover:underline">{post.title}</h3>
            </Link>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default PostDetails;
