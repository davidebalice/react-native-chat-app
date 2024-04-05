import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  TextInput,
  Button,
  Alert,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";

const Message = ({ message, currentfriend, scrollRef, typingMessage }) => {
  useEffect(() => {
    // scrollRef.scrollToEnd({ animated: true });
  }, [message]);
  const { myInfo } = useSelector((state) => state.auth);

  return (
    <>
      <View style={styles.messageContainer}>
        {message && message.length > 0 ? (
          message.map((m, index) =>
            m.senderId === myInfo.id ? (
              <View style={styles.message}>
                <Text style={styles.messageText}>
                  {" "}
                  {m.message.text === "" ? (
                    <Image
                      source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/photo/${m.message.image}`}
                      alt=""
                    />
                  ) : (
                    m.message.text
                  )}
                </Text>

                {index === message.length - 1 && m.senderId === myInfo.id ? (
                  m.status === "seen" ? (
                    <Image
                      className="img"
                      spurce={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${currentfriend.photo}`}
                      alt=""
                    />
                  ) : m.status === "delivared" ? (
                    <Text></Text>
                  ) : (
                    <Text></Text>
                  )
                ) : (
                  <Text></Text>
                )}
              </View>
            ) : (
              <View ref={scrollRef} >
                <View>
                  <Image
                    source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${currentfriend.photo}`}
                    alt=""
                  />
                  <View className="message-time">
                    <View className="fd-text">
                      <Text className="message-text">
                        {" "}
                        {m.message.text === "" ? (
                          <Image
                            source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${m.message.photo}`}
                          />
                        ) : (
                          m.message.text
                        )}{" "}
                      </Text>
                    </View>
                    <View className="time">
                      {moment(m.createdAt).startOf("mini").fromNow()}
                    </View>
                  </View>
                </View>
              </View>
            )
          )
        ) : (
          <View className="friend_connect">
            <Image
              source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${currentfriend.photo}`}
              alt=""
            />
            <Text>{currentfriend.userName} Connect You </Text>
            <Text>
              {" "}
              {moment(currentfriend.createdAt).startOf("mini").fromNow()}{" "}
            </Text>
          </View>
        )}
      </View>
      {typingMessage &&
      typingMessage.msg &&
      typingMessage.senderId === currentfriend._id ? (
        <View className="typing-message">
          <View className="fd-message">
            <View className="image-message-time">
              <Image
                source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${currentfriend.photo}`}
                alt=""
              />
              <View className="message-time">
                <View className="fd-text">
                  <Text className="time">Typing Message.... </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text></Text>
      )}
      <View style={styles.spacer}></View>
    </>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageContainer: {
    alignItems: "flex-end",
    marginVertical: 10,
    paddingHorizontal:10,
  },
  message: {
    padding: 6,
    paddingBottom: 0,
    paddingTop: 0,
    borderRadius: 8,
    maxWidth: "80%", 
    marginBottom:0,
  },
  messageText: {
    flexDirection: "column",
    backgroundColor: "#007aff",
    color: "#fff",
    textAlign: "right",
    padding: 6,
    borderRadius: 10,
    maxWidth: "80%",
  },
  messageImg: {
    width: "40%",
    height: "auto",
    marginRight: 0,
    borderRadius: 5,
    overflow: "hidden",
    objectFit: "cover",
  },
  spacer: {
    height:40
  }
});
