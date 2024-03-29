import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SUCCESS_MESSAGE_CLEAR,
  ERROR_CLEAR,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  PAGE_CHAT,
  PAGE_SELECT_FRIEND,
} from "../types/authType";

import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";

const authState = {
  loading: true,
  authenticate: false,
  error: "",
  successMessage: "",
  myInfo: "",
  page: "login",
};

const tokenDecode = (token) => {
  const tokenDecoded = jwtDecode(token);
  const expTime = new Date(tokenDecoded.exp * 1000);
  if (new Date() > expTime) {
    return null;
  }
  return tokenDecoded;
};

const retrieveTokenAndDecode = async () => {
  try {
    const getToken = await AsyncStorage.getItem("authToken");
    console.log("getToken");
    console.log(getToken);
    if (getToken) {
      const getInfo = tokenDecode(getToken);
      if (getInfo) {
        authState.myInfo = getInfo;
        authState.authenticate = true;
        authState.loading = false;
      }
    }
  } catch (error) {
    console.error(
      "Errore durante il recupero e la decodifica del token:",
      error
    );
  }
};

retrieveTokenAndDecode();

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;

  if (type === REGISTER_FAIL || type === USER_LOGIN_FAIL) {
    return {
      ...state,
      error: payload.error,
      authenticate: false,
      myInfo: "",
      loading: true,
    };
  }

  if (type === REGISTER_SUCCESS || type === USER_LOGIN_SUCCESS) {
    const myInfo = tokenDecode(payload.token);
    return {
      ...state,
      myInfo: myInfo,
      successMessage: payload.successMessage,
      error: "",
      authenticate: true,
      loading: false,
      page: "friends",
    };
  }

  if (type === SUCCESS_MESSAGE_CLEAR) {
    return {
      ...state,
      successMessage: "",
    };
  }

  if (type === ERROR_CLEAR) {
    return {
      ...state,
      error: "",
    };
  }

  if (type === "LOGOUT_SUCCESS") {
    return {
      ...state,
      authenticate: false,
      myInfo: "",
      successMessage: "Logout Successfull",
    };
  }

  if (type === "PAGE_CHAT") {
    return {
      ...state,
      page: "chat",
    };
  }

  if (type === "PAGE_SELECT_FRIEND") {
    return {
      ...state,
      page: "friends",
    };
  }

  return state;
};
