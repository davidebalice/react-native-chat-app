import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./router/Navigator";
import { AuthProvider } from "./context/authContext";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./store/index.js";

//import { positions, transitions, Provider as AlertProvider } from "react-alert";
//import alertTemplate from "react-alert-template-basic";

const App = () => {
  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <Provider store={store}>
            <Navigator />
          </Provider>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
