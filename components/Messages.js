import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import MessageSend from "./MessageSend";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Messages = (props) => {
  const dispatch = useDispatch();
  const {
    currentfriend,
    inputHandle,
    newMessage,
    sendMessage,
    message,
    scrollRef,
    emojiSend,
    ImageSend,
    activeUser,
    typingMessage,
  } = props;

  const { page } = useSelector((state) => state.messenger);

  const back = () => {
    dispatch({
      type: "PAGE_FRIENDS",
      payload: {
        page: false,
      },
    });
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: true })
        }
        style={styles.messagesContainer}
      >
        <View className="right-side">
          <TextInput type="checkbox" id="dot" />
          <View className="row">
            <View className="image-name">
              <View className="image">
                <Image
                  source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${currentfriend.photo}`}
                />
                {activeUser &&
                activeUser.length > 0 &&
                activeUser.some((u) => u.userId === currentfriend._id) ? (
                  <View className="active-icon"></View>
                ) : (
                  <Text> </Text>
                )}
              </View>
              <View className="name">
                <Text>{currentfriend.userName}</Text>
              </View>
            </View>

            <Message
              message={message}
              currentfriend={currentfriend}
              scrollRef={scrollRef}
              typingMessage={typingMessage}
            />
          </View>
        </View>
      </ScrollView>
      <MessageSend
        inputHandle={inputHandle}
        newMessage={newMessage}
        sendMessage={sendMessage}
        emojiSend={emojiSend}
        ImageSend={ImageSend}
      />
    </>
  );
};

export default Messages;

const styles = StyleSheet.create({
  messagesContainer: {
    height: "60%",
  },
});
