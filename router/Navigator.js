import React from "react";
import { Button, Text, View } from "@react-navigation/native";
import Chat from "../components/Chat";
import Login from "../components/Login";

import { useSelector } from "react-redux";

const Navigator = () => {
  const { page } = useSelector((state) => state.auth);

  return (
    <>
      {page === "login" && <Login />}
      {page === "friends" && <Chat />}
      {page === "chat" && <Chat />}
      {page === "register" && <Register />}
    </>
  );
};
export default Navigator;
