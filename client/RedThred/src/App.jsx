import React, { useEffect, useState } from "react";
import SectionWrapper from "./hoc/SectionWrapper";
import { Grid } from "@mui/material";
import CleanForm from "./components/cleanForm/CleanForm";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [postID, setPostID] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    setPostID(null);
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Grid container justifyContent="flex-start" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setPostID={setPostID} />
              </Grid>
            </Grid>
          }
        />
        <Route
          path="/create"
          element={<Form postID={postID} setPostID={setPostID} />}
        />
        <Route path="/cleanCreate" element={<CleanForm />} />
      </Routes>
    </div>
  );
};

export default SectionWrapper(App);
