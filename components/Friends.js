import React from "react";
import moment from "moment";
import { Text, View, Image, TouchableOpacity } from "react-native";

const Friends = (props) => {
  const { fndInfo, msgInfo } = props.friend;
  const myId = props.myId;
  const { activeUser } = props;

  return (
    <>
      <Text>test</Text>
      <Text>test</Text>
      <Text>test</Text>
      <Text>test</Text>
      <View className="friend">
        <Text>test</Text>
        <Text>test</Text>
        <Text>test</Text>
        <Text>test</Text>
        <Text style={{ color: "black" }}>test</Text>
        <Text>test</Text>
        <View className="friend-image">
          <View className="image">
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${fndInfo.photo}`}
              alt=""
            />
            {activeUser &&
            activeUser.length > 0 &&
            activeUser.some((u) => u.userId === fndInfo._id) ? (
              <View className="active_icon"></View>
            ) : (
              ""
            )}
          </View>
        </View>

        <View className="friend-name-seen">
          <View className="friend-name">
            <h4
              className={
                msgInfo?.senderId !== myId &&
                msgInfo?.status !== undefined &&
                msgInfo.status !== "seen"
                  ? "unseen_message Fd_name "
                  : "Fd_name"
              }
            >
              {fndInfo.userName}
            </h4>

            <View className="msg-time">
              {msgInfo && msgInfo.senderId === myId ? (
                <span>You </span>
              ) : (
                <span
                  className={
                    msgInfo?.senderId !== myId &&
                    msgInfo?.status !== undefined &&
                    msgInfo.status !== "seen"
                      ? "unseen_message "
                      : ""
                  }
                >
                  {" "}
                  {fndInfo.userName + " "}{" "}
                </span>
              )}
              {msgInfo && msgInfo.message.text ? (
                <span
                  className={
                    msgInfo?.senderId !== myId &&
                    msgInfo?.status !== undefined &&
                    msgInfo.status !== "seen"
                      ? "unseen_message "
                      : ""
                  }
                >
                  {msgInfo.message.text.slice(0, 10)}
                </span>
              ) : msgInfo && msgInfo.message.photo ? (
                <span>Send A image </span>
              ) : (
                <span>Connect You </span>
              )}
              <span>
                {msgInfo
                  ? moment(msgInfo.createdAt).startOf("mini").fromNow()
                  : moment(fndInfo.createdAt).startOf("mini").fromNow()}
              </span>
            </View>
          </View>

          {myId === msgInfo?.senderId ? (
            <View className="seen-unseen-icon">
              {msgInfo.status === "seen" ? (
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${fndInfo.photo}`}
                  alt=""
                />
              ) : msgInfo.status === "delivared" ? (
                <View className="delivared">
                  <Text>icona da mettere</Text>
                </View>
              ) : (
                <View className="unseen"> </View>
              )}
            </View>
          ) : (
            <View className="seen-unseen-icon">
              {msgInfo?.status !== undefined && msgInfo?.status !== "seen" ? (
                <View className="seen-icon"> </View>
              ) : (
                ""
              )}
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default Friends;