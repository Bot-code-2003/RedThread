import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPostBySearch } from "../actions/posts";
import Posts from "./Posts/Posts";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// const [postID, setPostID] = useState(null);

const SearchResults = ({ setPostID }) => {
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("query");
  console.log("searchQuery: (SearchResults component) ", searchQuery);
  // const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (searchQuery) {
      dispatch(getPostBySearch(searchQuery));
    }
  }, [dispatch, searchQuery]);

  return (
    <div>
      <Posts setPostID={setPostID} isSearched={true} />
    </div>
  );
};

export default SearchResults;
