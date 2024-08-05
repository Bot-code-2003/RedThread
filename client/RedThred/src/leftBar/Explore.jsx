import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const Explore = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const posts = useSelector((state) => state.posts.allPosts);
  const navigate = useNavigate();

  return (
    <div className="p-0">
      <Grid container spacing={isMobile ? 0.5 : 2}>
        {posts.map((post) => (
          <Grid
            item
            xs={4}
            sm={3}
            md={3}
            lg={2.4}
            key={post._id}
            className="relative group"
          >
            <div
              className="hover:cursor-pointer shadow-md relative"
              onClick={() => navigate(`/postDetails/${post._id}`)}
            >
              <div
                className="w-full pb-[100%] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${post.selectedFile})`,
                }}
              ></div>
              <div
                className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 ${
                  !isMobile
                    ? "opacity-0 group-hover:opacity-100"
                    : "opacity-100"
                } transition-opacity duration-300`}
              >
                <h2 className="text-[10px] sm:text-xl font-bold text-white">
                  {post.title.length > (isMobile ? 16 : 24)
                    ? post.title.substring(0, isMobile ? 16 : 24) + "..."
                    : post.title}
                </h2>
                <p className="text-[8px] sm:text-lg text-gray-300">
                  {post.name}
                </p>
                <p className="text-[8px] sm:text-lg text-gray-300">
                  {post.likes.length} likes •{" "}
                  {moment(post.createdAt).tz("Asia/Kolkata").fromNow()}
                </p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Explore;
