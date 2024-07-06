import React, { useEffect } from "react";
import SectionWrapper from "./hoc/SectionWrapper";
import { Grid } from "@material-ui/core";

import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Grid container justifyContent="flex-start" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts />
              </Grid>
            </Grid>
          }
        />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
};

export default SectionWrapper(App);
