import * as api from "../api";

/**
 * Gets all the posts from the server as per limit of 4
 * @param {number} page - The page number to fetch
 * @returns {object} - Contains total pages and posts. (totalPages used to findout if we reached the final page then no need of loading or dispatching more data);
 */
export const getPosts = (page) => async (dispatch) => {
  try {
    console.log("Fetching posts...(actions)");
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
 * Fetch a clicked post.
 *
 * @param {string} id
 * @returns {object} - The post
 */
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPost(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetch a searched post.
 *
 * @param {String} searchQuery  - The search query
 * @returns {Promise<void>} - A function that performs the search and dispatches an action.
 */
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

/**
 * Creates a new post
 *
 * @param {Object} post - The post to be created (title, msg, tags, img, author)
 * @returns {Promise<void>} - A function that performs the creation and dispatches an action.
 */
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    const action = {
      type: "CREATE",
      payload: data,
    };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates a post with the given ID.
 *
 * @param {String} id - The ID of the post to be updated
 * @param {Object} post - The to be updated post
 * @returns
 */
export const updatePost = (id, post) => async (dispatch) => {
  try {
    console.log(post, typeof post);
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
 * @returns {Promise<void>} - A function that performs the deletion and dispatches an action.
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
 * @returns {Promise<void>} - A function that dispatches an action with the updated post data.
 */
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

/**
 *  Comments on a post.
 *
 * @param {String} commentAuthor - The author of the comment.
 * @param {String} comment - The content of the comment.
 * @param {String} postId - The ID of the post to comment on.
 * @param {String} authorId - The ID of the author. (used to check if the logged in user and the author are the same)
 * @returns {object} - The updated post data.
 */
export const commentPost =
  (commentAuthor, authorId, comment, postId) => async (dispatch) => {
    try {
      const { data } = await api.commentPost(
        commentAuthor,
        authorId,
        comment,
        postId
      );

      console.log(data);
      const action = {
        type: "COMMENT",
        payload: data,
      };
      dispatch(action);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

/**
 * Deletes a comment with the given ID.
 *
 * @param {String} postId - The ID of the post to delete the comment from.
 * @param {String} commentId - The ID of the comment to delete.
 * @returns {Promise<void>} - A promise that resolves when the deletion operation is complete.
 */
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.deleteComment(postId, commentId); // Delets the post in Database.
    dispatch({
      // sends the postId and commentId to remove the post from the state.
      type: "DELETE_COMMENT",
      payload: { postId, commentId },
    });
  } catch (error) {
    console.error(error);
  }
};
