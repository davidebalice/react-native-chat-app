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
  FlatList,
} from "react-native";

//import { FaRegCheckCircle } from "react-icons/fa";

const Message = ({ message, currentfriend, scrollRef, typingMessage }) => {
  useEffect(() => {
    // scrollRef.scrollToEnd({ animated: true });
  }, [message]);
  const { myInfo } = useSelector((state) => state.auth);

  return (
    <>
      <View className="message-show">
        {message && message.length > 0 ? (
          message.map((m, index) =>
            m.senderId === myInfo.id ? (
              <ScrollView
                ref={scrollRef}
                className="my-message"
                onContentSizeChange={() =>
                  scrollRef.current.scrollToEnd({ animated: true })
                }
              >
                <View className="image-message">
                  <View className="my-text">
                    <Text className="message-text">
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

                    {index === message.length - 1 &&
                    m.senderId === myInfo.id ? (
                      m.status === "seen" ? (
                        <Image
                          className="img"
                          spurce={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${currentfriend.photo}`}
                          alt=""
                        />
                      ) : m.status === "delivared" ? (
                        <Text>FaRegCheckCircle</Text>
                      ) : (
                        <Text>FaRegCheckCircle</Text>
                      )
                    ) : (
                      <Text></Text>
                    )}
                  </View>
                </View>
                <View className="time">
                  <Text>{moment(m.createdAt).startOf("mini").fromNow()}</Text>
                </View>
              </ScrollView>
            ) : (
              <View ref={scrollRef} className="fd-message">
                <View className="image-message-time">
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
    </>
  );
};

export default Message;
