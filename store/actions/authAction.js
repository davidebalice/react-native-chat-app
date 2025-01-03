import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URLS from "../../config";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../types/authType";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${API_URLS.chatApi}/api/chat/user-register`,
        data,
        config
      );
      AsyncStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogin = (data) => {
  return async (dispath) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${API_URLS.chatApi}/api/chat/user-login/`,
        data,
        config
      );

      if (response.status === 200) {
        AsyncStorage.setItem("authToken", response.data.token);
        console.log(response.data.token);
        dispath({
          type: USER_LOGIN_SUCCESS,
          payload: {
            successMessage: response.data.successMessage,
            token: response.data.token,
          },
        });
      }
    } catch (error) {
      console.log("error catch");
      console.log(error.message);
      dispath({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogout = () => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URLS.chatApi}/api/chat/user-logout`
    );
    if (response.data.success) {
      AsyncStorage.removeItem("authToken");
      dispatch({
        type: "LOGOUT_SUCCESS",
      });
      
    }
  } catch (error) {}
};

export const setPage = (newPage) => {
  return {
    type: "SET_PAGE",
    payload: newPage,
  };
};
