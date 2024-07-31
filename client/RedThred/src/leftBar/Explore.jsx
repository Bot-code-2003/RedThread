import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const posts = useSelector((state) => state.posts.allPosts);
  const navigate = useNavigate();

  // Filter out non-image posts if on mobile
  const filteredPosts = isMobile
    ? posts.filter((post) => post.selectedFile)
    : posts;

  return (
    <div className="p-4">
      <Grid container spacing={isMobile ? 1 : 3}>
        {filteredPosts.map((post) => (
          <Grid item xs={4} sm={4} md={4} lg={3} key={post._id}>
            {post.selectedFile ? (
              <div
                onClick={() => navigate(`/postDetails/${post._id}`)}
                className="relative w-full pb-[100%] bg-cover bg-center rounded-sm hover:cursor-pointer hover:shadow-2xl"
                style={{
                  backgroundImage: `url(${post.selectedFile})`,
                }}
              >
                <p className="absolute top-2 left-1 text-[10px] sm:text-sm bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-50 p-1 rounded">
                  {isMobile
                    ? post.title.length > 15
                      ? post.title.substring(0, 15) + ".."
                      : post.title
                    : post.title.length > 40
                    ? post.title.substring(0, 40) + "..."
                    : post.title}
                </p>
                <div className="absolute bottom-1 left-1 flex gap-2 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-50 p-1 rounded">
                  <p className="text-[10px] sm:text-sm">
                    <FavoriteBorder fontSize={isMobile ? "xs" : "medium"} />{" "}
                    {post.likes.length}
                  </p>
                  <p className="text-[10px] sm:text-sm">
                    <CommentIcon fontSize={isMobile ? "xs" : "medium"} />{" "}
                    {post.comments.length}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="relative w-full p-3 border min-h-[100%] rounded-sm hover:cursor-pointer hover:shadow-2xl"
                onClick={() => navigate(`/postDetails/${post._id}`)}
              >
                <p className={`text-${isMobile ? "xs" : "xl"}`}>
                  {isMobile && post.title.length > 20
                    ? post.title.substring(0, 20) + "..."
                    : post.title}
                </p>
                <div
                  className={`mt-1 dark:text-gray-300 text-${
                    isMobile ? "xs" : "base"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: post?.message
                      ? post.message.length > 450
                        ? post.message.substring(0, 450) + "..."
                        : post.message
                      : "",
                  }}
                />
                <div className="absolute bottom-1 left-1 flex gap-2 bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-50 p-1 rounded">
                  <p>
                    <FavoriteBorder /> {post.likes.length}
                  </p>
                  <p>
                    <CommentIcon /> {post.comments.length}
                  </p>
                </div>
              </div>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Explore;
