import React from "react";
import FriendInfo from "./FriendInfo";
import Message from "./Message";
import MessageSend from "./MessageSend";
import { useDispatch, useSelector } from "react-redux";
//import { IoCaretBack } from "react-icons/io5";
import { View, TextInput, Button, Alert, Image, Text } from "react-native";

const Messages = (props) => {
  const dispatch = useDispatch();
  const {
    currentfriend,
    inputHendle,
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
    <View className={`col-9 column0 ${page ? "" : "hiddenOnMobile"}`}>
      <View className="right-side">
        <TextInput type="checkbox" id="dot" />
        <View className="row">
          <View className="col-8 column2">
            <View className="message-send-show">
              <View className="header">
                <View className="image-name">
                  <View onClick={back} className="backButton">
                    <Text>icona FaRegCheckCircle</Text>
                  </View>
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
              </View>

              <Message
                message={message}
                currentfriend={currentfriend}
                scrollRef={scrollRef}
                typingMessage={typingMessage}
              />

              <MessageSend
                inputHendle={inputHendle}
                newMessage={newMessage}
                sendMessage={sendMessage}
                emojiSend={emojiSend}
                ImageSend={ImageSend}
              />
            </View>
          </View>

          <View className="col-2 column3">
            <FriendInfo
              message={message}
              currentfriend={currentfriend}
              activeUser={activeUser}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Messages;
