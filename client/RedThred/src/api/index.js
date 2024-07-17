import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    // console.log("TOKEN: ", JSON.parse(localStorage.getItem("profile")).token);
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token // localStorage.getItem returns a json string
    }`;
  }
  return req;
});
// const url = "http://localhost:5000/posts";

export const fetchPosts = (page) => API.get(`/posts/${page}`); // send the page no.
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
