import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPostBySearch } from "../actions/posts";
import Posts from "./Posts/Posts";

/**
 *
 * @returns {string} - Contains searched term.
 */
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = ({ setPostID }) => {
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("query");

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
