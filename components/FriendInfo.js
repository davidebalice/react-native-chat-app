import React from "react";
import { View, TextInput, Button, Alert, Image } from "react-native";
const FriendInfo = ({ currentfriend, activeUser, message }) => {
  return (
    <View className="friend-info">
      {/*
      <input type="checkbox" id="gallery" />
     */}

      <View className="image-name">
        <View className="image">
          <Image source={`./api/chat/images/${currentfriend.photo}`} />
        </View>
        {activeUser &&
        activeUser.length > 0 &&
        activeUser.some((u) => u.userId === currentfriend._id) ? (
          <View className="active-user">Active</View>
        ) : (
          ""
        )}

        <View className="name">
          <Text>
            {currentfriend.name} {currentfriend.surname}{" "}
            {currentfriend.userName}
          </Text>
        </View>
      </View>

      <View className="gallery">
        {message && message.length > 0
          ? message.map(
              (m, index) =>
                m.message.photo && (
                  <Image source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${m.message.photo}`} />
                )
            )
          : ""}
      </View>
    </View>
  );
};

export default FriendInfo;
