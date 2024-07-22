import * as api from "../api";

/**
 * @param {object} formData
 * @param {function} navigate
 * @returns null
 */
export const signin = (formData, navigate) => async (dispatch) => {
  try {
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

/**
 * @param {object} formData
 * @param {function} navigate
 * @returns null
 */
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData); /**returns { result, token } */
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
