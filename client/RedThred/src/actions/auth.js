import * as api from "../api";

/**
 * Logs the existing user.
 *
 * @param {object} formData
 * @param {function} navigate
 * @returns {Promise<void>}
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
 * Signs the new user.
 *
 * @param {object} formData
 * @param {function} navigate
 * @returns {Promise<void>}
 */
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.signUp(formData); /**returns { result, token } */
    const action = {
      type: "AUTH",
      payload: data,
    };
    dispatch(action);
    navigate("/newSignup");
  } catch (error) {
    console.log(error);
  }
};
