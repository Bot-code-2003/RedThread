import * as api from "../api";

export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page); // send the page no. Contains currentPage, totalPages, data
    if (data.currentPage <= data.totalPages) {
      dispatch({ type: "FETCH_ALL", payload: data });
      return data; // Return the data for further use
    } else {
      console.log("No more posts");
      return null; // No more posts
    }
  } catch (error) {
    console.log(error);
    return null; // Return null in case of an error
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    console.log(data);
    const action = {
      type: "CREATE",
      payload: data,
    };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    const action = {
      type: "UPDATE",
      payload: data,
    };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    api.deletePost(id);
    const action = {
      type: "DELETE",
      payload: id,
    };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    const action = {
      type: "LIKE",
      payload: data,
    };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
