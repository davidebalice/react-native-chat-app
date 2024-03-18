import React, { useState, useRef } from "react";
import { DrawerLayoutAndroid } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, Button, Text, View } from "@react-navigation/native";
import Appbar from "../components/Appbar";
import HomeScreen from "../screens/HomeScreen";
import ThemeScreen from "../screens/ThemeScreen";
import ChatScreen from "../screens/ChatScreen";
import SideMenu from "../components/SideMenu";

const Stack = createStackNavigator();

const Navigator = () => {
  const drawer = useRef(null);
  const navigation = useNavigation();

  const openDrawer = () => {
    if (drawer.current) {
      drawer.current.openDrawer();
    }
  };

  const closeDrawer = () => {
    if (drawer.current) {
      drawer.current.closeDrawer();
    }
  };

  const Drawer = () => {
    return (
      <>
        <SideMenu navigation={navigation} closeDrawer={closeDrawer} />
      </>
    );
  };
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={Drawer}
    >
      <Appbar openDrawer={openDrawer}></Appbar>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Theme"
          component={ThemeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </DrawerLayoutAndroid>
  );
};

export default Navigator;
