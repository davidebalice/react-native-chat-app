import React, { useState, useEffect } from "react";

//import { Link, useNavigate } from "react-router-dom";
import {
  View,
  TextInput,
  Button,
  Alert,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { userLogin } from "../store/actions/authAction";
//import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authType";

const Login = () => {
  //const navigate = useNavigate();

  //const alert = useAlert();

  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "mario@rossi.it",
    password: "12345678",
  });

  const inputHandle = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(userLogin(state));
  };

  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }
    if (successMessage) {
      //alert.success(successMessage);
      dispatch({ type: SUCCESS_MESSAGE_CLEAR });
    }
    if (error) {
      // error.map((err) => alert.error(err));
      dispatch({ type: ERROR_CLEAR });
    }
  }, [successMessage, error]);

  return (
    <View className="register">
      <View className="card">
        <View className="card-header">
          <Text>Login</Text>
        </View>

        <View className="card-body">
          {/*
          <form onSubmit={login}>
          */}
          <View className="form-group">
            <Text htmlFor="email">Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => inputHandle("email", value)}
              placeholder="Email"
              value={state.email}
              name="email"
            />
          </View>

          <View className="form-group">
            <Text htmlFor="password">Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={state.password}
              name="password"
              onChangeText={(value) => inputHandle("password", value)}
            />
          </View>

          <View className="form-group">
            <TouchableOpacity onPress={login} style={styles.loginButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View className="form-group">
            {/*  <Link to="/chat/register"> Register new account </Link> */}
            <Text to="/chat/register"> Register new account </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 150,
  },
  loginBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "80%",
    height: 290,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  paragraph: {
    padding: 12,
    paddingTop: 0,
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  loginButton: {
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#444",
    color: "#ffffff",
    borderRadius: 2,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  demoData: {
    marginTop: 5,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#dddddd",
    padding: 2,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  demoDataP: {
    marginTop: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  demoDataP2: {
    marginTop: 1,
    textAlign: "center",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

export default Login;
