import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  View,
  TextInput,
  Button,
  Alert,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import API_URLS from "../config";

const Friends = (props) => {
  const { fndInfo, msgInfo } = props.friend;
  const myId = props.myId;
  const { activeUser } = props;

  return (
    <View style={styles.friend}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `${API_URLS.chatApi}/api/uploads/users/${fndInfo.photo}`,
          }}
          style={styles.image}
        />

        {activeUser &&
        activeUser.length > 0 &&
        activeUser.some((u) => u.userId === fndInfo._id) ? (
          <View className="active_icon"></View>
        ) : (
          <Text> </Text>
        )}
      </View>
      <View>
        <Text style={styles.title}>{fndInfo.userName}</Text>

        <Text style={styles.msgTime}>
          {msgInfo
            ? moment(msgInfo.createdAt).startOf("mini").fromNow()
            : moment(fndInfo.createdAt).startOf("mini").fromNow()}
        </Text>
      </View>
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
  },
  friend: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  imageContainer: {
    width: "20%",
    padding: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:12
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  iconContainer: {
    width: 23,
    textAlign: "center",
  },
  text: {
    marginLeft: 20,
    color: "#111",
  },
  titleContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1000,
  },
  title: {
    fontWeight: "bold",
    color: "#444",
    fontSize: 17,
  },
  logoContainer: {
    textAlign: "right",
    display: "flex",
    width: "100%",
    padding: 14,
  },
  logo: {
    width: 100,
    height: 30,
    alignSelf: "flex-end",
  },
  msgTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});
