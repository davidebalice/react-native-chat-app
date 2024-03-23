import React from "react";
import moment from "moment";
//import { FaRegCheckCircle } from "react-icons/fa";
import { View, TextInput, Button, Alert, Image, Text } from "react-native";

const Friends = (props) => {
  const { fndInfo, msgInfo } = props.friend;
  const myId = props.myId;
  const { activeUser } = props;

  return (
    <View className="friend">
      <View className="friend-image">
        <View className="image">
          <Image
            source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${fndInfo.photo}`}
          />
          {activeUser &&
          activeUser.length > 0 &&
          activeUser.some((u) => u.userId === fndInfo._id) ? (
            <View className="active_icon"></View>
          ) : (
            <Text> </Text>
          )}
        </View>
      </View>

      <View className="friend-name-seen">
        <View className="friend-name">
          <Text
            className={
              msgInfo?.senderId !== myId &&
              msgInfo?.status !== undefined &&
              msgInfo.status !== "seen"
                ? "unseen_message Fd_name "
                : "Fd_name"
            }
          >
            {fndInfo.userName}
          </Text>

          <View className="msg-time">
            {msgInfo && msgInfo.senderId === myId ? (
              <Text>You </Text>
            ) : (
              <Text
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
              </Text>
            )}
            {msgInfo && msgInfo.message.text ? (
              <Text
                className={
                  msgInfo?.senderId !== myId &&
                  msgInfo?.status !== undefined &&
                  msgInfo.status !== "seen"
                    ? "unseen_message "
                    : ""
                }
              >
                {msgInfo.message.text.slice(0, 10)}
              </Text>
            ) : msgInfo && msgInfo.message.photo ? (
              <Text>Send image </Text>
            ) : (
              <Text>Connect you </Text>
            )}
            <Text>
              {msgInfo
                ? moment(msgInfo.createdAt).startOf("mini").fromNow()
                : moment(fndInfo.createdAt).startOf("mini").fromNow()}
            </Text>
          </View>
        </View>

        {myId === msgInfo?.senderId ? (
          <View className="seen-unseen-icon">
            {msgInfo.status === "seen" ? (
              <Image
                source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${fndInfo.photo}`}
              />
            ) : msgInfo.status === "delivared" ? (
              <View className="delivared">
                <Text>icona FaRegCheckCircle</Text>
              </View>
            ) : (
              <View className="unseen"><Text> </Text></View>
            )}
          </View>
        ) : (
          <View className="seen-unseen-icon">
            {msgInfo?.status !== undefined && msgInfo?.status !== "seen" ? (
              <View className="seen-icon"><Text> </Text></View>
            ) : (
              <Text> </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Friends;
