import React from "react";

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
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${user.userInfo.photo}`}
            alt=""
          />
          <View className="active-icon"></View>
        </View>
      </View>
    </View>
  );
};

export default ActiveFriend;
