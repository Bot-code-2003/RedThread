import axios from "axios";

const API = axios.create({ baseURL: "https://red-thread-nine.vercel.app" });

// https://red-thread-nine.vercel.app

/**
 * Adds an authorization header to all outgoing HTTP requests if a token is available in local storage.
 *
 * This interceptor checks for a stored user profile in local storage. If a profile is found, it extracts
 * the token from the profile and sets it in the `Authorization` header of the request. The token is added as
 * a Bearer token (e.g., `Bearer <token>`), ensuring that the server can authenticate and authorize the request.
 */
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token // localStorage.getItem returns a json string
    }`;
  }
  return req;
});
// const url = "http://localhost:5000/posts";

export const fetchPosts = (page) => (
  console.log("Fetching posts...(api)"), API.get(`/posts/${page}`)
);
// send the page no. get data,currentPage, totalpages

/**
 * Fetch a clicked post.
 *
 * @param {string} id
 * @returns {Promise<AxiosResponse<object>>} - post or {message}.
 */
export const fetchPost = (id) => API.get(`/posts/details/${id}`);

/**
 * Fetch a searched post.
 *
 * @param {string} searchQuery
 * @returns {Promise<AxiosResponse<object>>} - {data} or {message}.
 */
export const fetchPostBySearch = (searchQuery) =>
  API.get(`/posts/search?searchQuery=${searchQuery || "none"}`);

export const createPost = (newPost) => API.post("/posts", newPost);

/**
 * Like a post.
 *
 * @param {string} id
 * @returns {Promise<AxiosResponse<any>>} - The updated post or error.
 */
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

/**
 * Delete a post.
 *
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise<AxiosResponse<any>>} - {message} or error.
 */
export const deletePost = (id) => API.delete(`/posts/${id}`);

/**
 * signIn and signUp
 *
 * @param {object} formData - May contain email, password, firstName, lastName.
 * @returns {Promise<AxiosResponse<object>>}
 */
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

/**
 * Create a comment
 *
 * @param {String} commentAuthor
 * @param {String} authorId
 * @param {String} comment
 * @param {String} postId
 * @returns {object} - axios response containing updatedPost in data key.
 */
export const commentPost = (commentAuthor, authorId, comment, postId) =>
  API.post(`/posts/${postId}/comment`, { commentAuthor, authorId, comment });

/**
 * Delets a post.
 *
 * @param {String} postId
 * @param {String} commentId
 */
export const deleteComment = (postId, commentId) =>
  API.delete(`/posts/${postId}/comment/${commentId}`);
