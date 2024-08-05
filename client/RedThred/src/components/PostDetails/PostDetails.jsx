import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getPostBySearch } from "../../actions/posts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AssistantIcon from "@mui/icons-material/Assistant";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, IconButton, useMediaQuery } from "@mui/material";
import PostSkeleton from "../PostSkeleton";
import CommentSection from "./CommentSection";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import moment from "moment-timezone";
import { useLocation } from "react-router-dom";

const PostDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const recommendedPosts = useSelector((state) => state.posts.recommendedPosts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const top = useRef(null);

  useEffect(() => {
    setCurrentIndex(0);
    top.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    if (post?.title) {
      dispatch(getPostBySearch(post?.title));
    }
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
      setImageWidth(width);
      setImageHeight(height);
    };
    img.src = imgSrc;
  };

  useEffect(() => {
    if (post?.selectedFile) {
      checkImageResolution(post.selectedFile);
    }
  }, [post?.selectedFile]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(
        isMobile ? prevIndex + 3 : prevIndex + 4,
        isMobile ? recommendedPosts.length - 3 : recommendedPosts.length - 4
      )
    );
  };

  return (
    <Grid ref={top} container>
      <Grid item xs={12} lg={12}>
        {post ? (
          <div className=" p-4 flex flex-col items-center w-full bg-white dark:bg-transparent dark:text-white rounded-lg">
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
              {(imageWidth < 600 || imageHeight > 1000) && (
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
                  maxWidth: imageWidth < 600 ? "100%" : "1000px",
                  maxHeight: imageHeight < 600 ? "100%" : "800px",
                  minHeight: isMobile ? "300px" : "500px",
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
          </div>
        ) : (
          <PostSkeleton />
        )}
      </Grid>

      <div className="border-b border-gray-200 mb-2 w-full" />
      <div className="flex items-center mb-1 gap-2">
        <AssistantIcon color="primary" />
        <h1 className="dark:text-white text-2xl">Recommended Posts</h1>
      </div>
      <div className="flex items-center justify-center w-full">
        <IconButton
          className="dark:hover:bg-slate-300 "
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="previous"
        >
          <ArrowBackIosIcon sx={{ color: "gray" }} />
        </IconButton>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          style={{
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {recommendedPosts
            .slice(currentIndex, isMobile ? currentIndex + 3 : currentIndex + 4)
            .map((post) => (
              <Grid item xs={6} sm={6} md={4} key={post._id}>
                <div
                  className="hover:cursor-pointer shadow-md p-0"
                  onClick={() => navigate(`/postDetails/${post._id}`)}
                >
                  <div
                    className="relative w-full pb-[100%] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${post.selectedFile})`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-center">
                        <h2 className="hidden sm:block sm:text-xl font-bold">
                          {post.title.length > 24
                            ? post.title.substring(0, 25) + "..."
                            : post.title}
                        </h2>
                        <p className="hidden sm:block sm:text-lg text-gray-200">
                          {post.name}
                        </p>
                        <p className="hidden sm:block sm:text-lg text-gray-200">
                          {post.likes.length} likes •{" "}
                          {moment(post.createdAt).tz("Asia/Kolkata").fromNow()}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>
        <IconButton
          className="dark:hover:bg-slate-300 "
          onClick={handleNext}
          disabled={currentIndex + 4 >= recommendedPosts.length}
          aria-label="next"
        >
          <ArrowForwardIosIcon sx={{ color: "gray" }} />
        </IconButton>
      </div>
      <div className="border-b border-gray-200 mb-2 mt-2 w-full" />
      <Grid item xs={12} lg={12}>
        <CommentSection post={post} />
      </Grid>
    </Grid>
  );
};

export default PostDetails;
