import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const Explore = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const posts = useSelector((state) => state.posts.allPosts);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <Grid container spacing={isMobile ? 1 : 3}>
        {posts.map((post) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={post._id}>
            {post.selectedFile ? (
              <div
                className="mb-1 sm:mb-0 hover:cursor-pointer shadow-md rounded-lg p-2"
                onClick={() => navigate(`/postDetails/${post._id}`)}
              >
                <div
                  className="div-one relative w-full pb-[100%] bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url(${post.selectedFile})`,
                  }}
                ></div>
                <div className="div-two p-1">
                  <h2 className="text-md sm:text-xl font-bold mt-1">
                    {isMobile
                      ? post.title.length > 16
                        ? post.title.substring(0, 16) + ".."
                        : post.title
                      : post.title.length > 24
                      ? post.title.substring(0, 25) + "..."
                      : post.title}
                  </h2>
                  <p className="text-xs sm:text-lg text-gray-500">
                    {post.name}
                  </p>
                  <div>
                    <p className="text-xs sm:text-lg text-gray-500">
                      {post.likes.length} likes •{" "}
                      {moment(post.createdAt).tz("Asia/Kolkata").fromNow()}{" "}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="mb-1 sm:mb-0 hover:cursor-pointer shadow-md rounded-lg flex flex-col justify-between min-h-[100%] p-2"
                onClick={() => navigate(`/postDetails/${post._id}`)}
              >
                <div
                  className="text-xs relative w-full p-1 border rounded-md "
                  dangerouslySetInnerHTML={{
                    __html: isMobile
                      ? post?.message.length > 280
                        ? post?.message.substring(0, 280) + "..."
                        : post?.message
                      : post?.message.length > 500
                      ? post?.message.substring(0, 500) + "..."
                      : post?.message,
                  }}
                />
                <div className="div-two p-1">
                  <h2 className="text-md sm:text-xl font-bold mt-1">
                    {isMobile
                      ? post.title.length > 18
                        ? post.title.substring(0, 17) + ".."
                        : post.title
                      : post.title.length > 24
                      ? post.title.substring(0, 25) + "..."
                      : post.title}
                  </h2>
                  <p className="text-xs sm:text-lg text-gray-500">
                    {post.name}
                  </p>
                  <div>
                    <p className="text-xs sm:text-lg text-gray-500">
                      {post.likes.length} likes •{" "}
                      {moment(post.createdAt).tz("Asia/Kolkata").fromNow()}{" "}
                    </p>
                  </div>
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
