import axios from "axios";
import base64 from "base-64";

import { userRequest, loginSuccess, signUpSuccess, logoutSuccess, userFailure } from "../features/userSlicer";

export const login = (dispatch, payload, navigate) => {
  const { userName, password } = payload;
  const encodedUser = base64.encode(`${userName}:${password}`);

  try {
    dispatch(userRequest());
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {},
        {
          headers: {
            Authorization: `Basic ${encodedUser}`,
          },
        }
      )
      .then((response) => {
        dispatch(loginSuccess(response.data));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.userName);
        navigate("/");
      })
      .catch((error) => {
        dispatch(userFailure(error.response.data.message));
      });
  } catch (error) {
    dispatch(userFailure(error.message));
  }
};

export const signUp = (dispatch, payload, navigate) => {
  const { userName, password } = payload;

  try {
    dispatch(userRequest());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
        userName,
        password,
      })
      .then((response) => {
        dispatch(signUpSuccess(response.data));
        navigate("/login");
      })
      .catch((error) => {
        dispatch(userFailure(error.response.data));
      });
  } catch (error) {
    dispatch(userFailure(error.message));
  }
};

export const logout = (dispatch, navigate) => {
  try {
    dispatch(logoutSuccess());
    localStorage.clear();
    navigate("/");
  } catch (error) {
    dispatch(userFailure(error.message));
  }
};
