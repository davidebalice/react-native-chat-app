import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SUCCESS_MESSAGE_CLEAR,
  ERROR_CLEAR,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../types/authType";

import AsyncStorage from "@react-native-async-storage/async-storage";
//import deCodeToken from "jwt-decode";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
//import * as jwt_decode from 'jwt-decode';

/*
STEP 1 Install npm install core-js

STEP 2 import "core-js/stable/atob";

Now simply use const token = "your_token";

const decoded = jwtDecode(token);
*/

const authState = {
  loading: true,
  authenticate: false,
  error: "",
  successMessage: "",
  myInfo: "",
};

const tokenDecode = (token) => {
  const tokenDecoded = jwtDecode(token);
  console.log("tokenDecoded");
  console.log(tokenDecoded);
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
    console.log("qui");
    const myInfo = tokenDecode(payload.token);
    console.log(myInfo);
    return {
      ...state,
      myInfo: myInfo,
      successMessage: payload.successMessage,
      error: "",
      authenticate: true,
      loading: false,
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

  return state;
};
