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
import { useNavigate } from "react-router-dom";
import TermsAndConditions from "./policy/TermsAndConditions";
import CommunityGuidelines from "./policy/CommunityGuidelines";
import PrivacyPolicy from "./policy/PrivacyPolicy";
import VersionInfo from "./policy/VersionInfo";
import AboutUs from "./policy/AboutUs";

import ForumIcon from "@mui/icons-material/Forum";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GavelIcon from "@mui/icons-material/Gavel";
import PolicyIcon from "@mui/icons-material/Policy";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import InfoIcon from "@mui/icons-material/Info";
import GestureIcon from "@mui/icons-material/Gesture";
const App = () => {
  const [postID, setPostID] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            <Grid container spacing={2}>
              <Grid
                className="sm:block sm:overflow-hidden overflow-x-scroll"
                item
                lg={2}
              >
                <div className="dark:text-white flex items-center sm:items-stretch text-nowrap sm:flex-col gap-2">
                  <button className="flex justify-start gap-2 disabled-link border rounded-sm p-2 ">
                    <ForumIcon />
                    Communities
                  </button>
                  <button className="flex justify-start gap-2 border rounded-sm p-2 disabled-link">
                    <WhatshotIcon />
                    Trending
                  </button>
                  <button className="flex justify-start gap-2 border rounded-sm p-2 disabled-link">
                    <PersonAddIcon />
                    Friends
                  </button>
                  <button
                    className="flex justify-start gap-2 border rounded-sm p-2 hover:underline"
                    onClick={() => navigate("/terms")}
                  >
                    <GavelIcon />
                    Terms and Conditions
                  </button>
                  <button
                    className="flex justify-start gap-2 border rounded-sm p-2 hover:underline"
                    onClick={() => navigate("/guidelines")}
                  >
                    <TipsAndUpdatesIcon />
                    Community Guidelines
                  </button>
                  <button
                    className="flex justify-start gap-2 border rounded-sm p-2 hover:underline"
                    onClick={() => navigate("/privacy")}
                  >
                    <PolicyIcon />
                    Privacy Policy
                  </button>
                  <button
                    className="flex justify-start gap-2 border rounded-sm p-2 hover:underline"
                    onClick={() => navigate("/aboutus")}
                  >
                    <GestureIcon />
                    About us
                  </button>
                  <button
                    className="flex justify-start gap-2 border rounded-sm p-2 hover:underline"
                    onClick={() => navigate("/versionInfo")}
                  >
                    <InfoIcon />
                    RedThread 1.0
                  </button>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={10}>
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
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/guidelines" element={<CommunityGuidelines />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/versionInfo" element={<VersionInfo />} />
        <Route path="/aboutus" element={<AboutUs />} />
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
