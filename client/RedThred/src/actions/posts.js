import * as api from "../api";

/**
 * Gets all the posts from the server as per limit of 4
 * @param {number} page - The page number to fetch
 * @returns {object} - Contains total pages and posts.
 */
export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page);
    if (page <= data.totalPages) {
      dispatch({ type: "FETCH_ALL", payload: data });
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 *
 * @param {string} id
 * @returns
 */
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPost(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostBySearch(searchQuery);
    dispatch({
      type: "FETCH_BY_SEARCH",
      payload: { data: data.data, recommendedPosts: data.recommendedPosts },
    });
  } catch (error) {
    console.log(error);
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

/**
 * Deletes a post with the given ID.
 *
 * @param {string} id - The ID of the post to delete.
 * @returns {Function} - A function that performs the deletion and dispatches an action.
 */
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    const action = {
      type: "DELETE",
      payload: id,
    };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Likes a post with the given ID.
 *
 * @param {string} id - The ID of the post to be liked.
 * @returns {Function} - A function that dispatches an action with the updated post data.
 */
export const likePost = (id) => async (dispatch) => {
  try {
    /**
     * The response data containing the updated post.
     * @type {object}
     * @property {object} data - The updated post data.
     */
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
