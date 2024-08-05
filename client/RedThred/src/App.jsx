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
import TermsAndConditions from "./leftBar/TermsAndConditions";
import CommunityGuidelines from "./leftBar/CommunityGuidelines";
import PrivacyPolicy from "./leftBar/PrivacyPolicy";
import VersionInfo from "./leftBar/VersionInfo";
import AboutUs from "./leftBar/AboutUs";
import Interests from "./components/Interests";

import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import ForumIcon from "@mui/icons-material/Forum";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GavelIcon from "@mui/icons-material/Gavel";
import PolicyIcon from "@mui/icons-material/Policy";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import InfoIcon from "@mui/icons-material/Info";
import GestureIcon from "@mui/icons-material/Gesture";
import Explore from "./leftBar/Explore";
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
      console.log("Page: ", page);
      const data = await dispatch(getPosts(page, (app = "true"))); // Pass the page parameter
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
  }, [loading, page, totalPages]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 50 &&
      !loading &&
      page < totalPages
    ) {
      setLoading(true);
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
      }, 2000);
    }
  };

  // Adding debounce
  useEffect(() => {
    const debounceHandleScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debounceHandleScroll);
    return () => window.removeEventListener("scroll", debounceHandleScroll);
  }, [loading, page]);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Grid container spacing={2}>
              <Grid
                className="sm:sticky sm:top-3 flex justify-center sm:h-[700px] sm:overflow-hidden overflow-x-scroll"
                item
                lg={2}
              >
                <div className="dark:text-white flex items-center sm:items-stretch text-nowrap sm:flex-col gap-2">
                  <button
                    onClick={() => navigate("/explore")}
                    className="ml-[650px] sm:ml-0 sm:flex justify-start gap-2 border rounded-sm p-2 "
                  >
                    <ExploreIcon />
                    Explore
                  </button>
                  <button className="hidden sm:flex justify-start gap-2 disabled-link border rounded-sm p-2 ">
                    <ForumIcon />
                    Communities
                  </button>
                  <button className="hidden sm:flex justify-start gap-2 border rounded-sm p-2 disabled-link">
                    <WhatshotIcon />
                    Trending
                  </button>
                  <button className="hidden sm:flex justify-start gap-2 border rounded-sm p-2 disabled-link">
                    <PersonAddIcon />
                    Friends
                  </button>
                  <button
                    className=" sm:ml-0 flex justify-start gap-2 border rounded-sm p-2 hover:underline"
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
                    <InfoIcon />
                    About us
                  </button>
                  <button
                    className="flex justify-start gap-2 border rounded-sm p-2 hover:underline"
                    onClick={() => navigate("/versionInfo")}
                  >
                    <GestureIcon />
                    RedThread 1.0
                  </button>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8}>
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
              <Grid item lg={2}>
                {/* <div className="dark:bg-gray-700 p-2 rounded-md min-h-28 dark:text-white"> */}
                {/* <p>work in progress...</p> */}
                {/* </div> */}
              </Grid>
            </Grid>
          }
        />
        <Route path="newSignup" element={<Interests />} />
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
        <Route path="/explore" element={<Explore />} />
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
