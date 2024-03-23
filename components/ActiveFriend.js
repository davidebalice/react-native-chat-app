import React from "react";
import { View, TextInput, Button, Alert, Image } from "react-native";

const ActiveFriend = ({ user, setCurrentFriend }) => {
  return (
    <View
      onClick={() =>
        setCurrentFriend({
          _id: user.userInfo.id,
          email: user.userInfo.email,
          photo: user.userInfo.photo,
          userName: user.userInfo.userName,
        })
      }
      className="active-friend"
    >
      <View className="image-active-icon">
        <View className="image">
          <Image
            source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${user.userInfo.photo}`}
          />
          <View className="active-icon"></View>
        </View>
      </View>
    </View>
  );
};

export default ActiveFriend;
