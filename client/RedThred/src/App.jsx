/**
 * App component - Responsible for the main layout of the application.
 */

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
import PostSkeleton from "./components/PostSkeleton";
import SearchResults from "./components/SearchResults";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const [postID, setPostID] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data according to the page.
    const fetchData = async () => {
      setLoading(true);
      const data = await dispatch(getPosts(page)); // Pass the page parameter
      setLoading(false);
      if (data) {
        setTotalPages(data.totalPages); // Update total pages state
      }
    };
    fetchData();
  }, [page]);

  /** scroll useEffect */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page]);

  const handleScroll = () => {
    // When user scrolls to the bottom of the page it updates page thereby resulting in above useEffect()
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 50 &&
      !loading &&
      page < totalPages
    ) {
      setLoading(true); // Trigger scroll useEffect
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1); // Increment page
      }, 2000);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Grid container>
              <Grid item xs={12} sm={12} md={8} lg={6}>
                <Posts setPostID={setPostID} />{" "}
                {/**postID from here is used in Form */}
                {loading && (
                  <>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                  </>
                )}{" "}
              </Grid>
            </Grid>
          }
        />
        <Route
          path="/search"
          element={
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <SearchResults setPostID={setPostID} />
                {loading && (
                  <>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                  </>
                )}{" "}
              </Grid>
            </Grid>
          }
        />
        <Route path="/postDetails/:id" element={<PostDetails />} />
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
