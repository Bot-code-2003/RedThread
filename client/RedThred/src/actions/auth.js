import * as api from "../api";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //login user
    const { data } = await api.signIn(formData);
    const action = {
      type: "AUTH",
      payload: data,
    };
    dispatch(action);
    navigate("/");
  } catch (error) {
    alert("User not found");
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //signup user
    const { data } = await api.signUp(formData);
    console.log("Action-auth: ", data);
    const action = {
      type: "AUTH",
      payload: data,
    };
    dispatch(action);
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
