import React, { useEffect, useState } from "react";
import SectionWrapper from "./hoc/SectionWrapper";
import { Grid } from "@mui/material";
import CleanForm from "./components/cleanForm/CleanForm";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import { Routes, Route } from "react-router-dom";
import Auth from "./Auth/Auth";
import PostSkeleton from "./components/PostSkeleton"; // Import PostSkeleton component

const App = () => {
  const [postID, setPostID] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await dispatch(getPosts(page)); // Pass the page parameter
      setLoading(false);
      if (data) {
        setTotalPages(data.totalPages); // Update total pages state
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 50 &&
      !loading &&
      page < totalPages
    ) {
      setLoading(true); // Start loading animation
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1); // Increment page
      }, 2000); // Simulate fetch delay
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPages]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Posts setPostID={setPostID} />
                {loading && <PostSkeleton />}{" "}
              </Grid>
            </Grid>
          }
        />
        <Route
          path="/create"
          element={<Form postID={postID} setPostID={setPostID} />}
        />
        <Route path="/cleanCreate" element={<CleanForm />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default SectionWrapper(App);
