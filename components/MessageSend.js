import React from "react";
import { View, TextInput, Button, Alert, Image, Text } from "react-native";

/*
import {
  FaFileImage,
  FaPaperPlane,
} from "react-icons/fa";
*/

const MessageSend = ({
  inputHendle,
  newMessage,
  sendMessage,
  emojiSend,
  ImageSend,
}) => {
  const emojis = [
    "😀",
    "😄",
    "😁",
    "😆",
    "😂",
    "🤣",
    "😊",
    "🙂",
    "🙃",
    "😉",
    "😍",
    "😝",
    "😜",
    "🧐",
    "🤓",
    "😎",
    "😕",
    "🤑",
    "🥴",
    "😱",
  ];

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <View className="message-send-section">
      <TextInput type="checkbox" id="emoji" />

      <View className="file hover-image">
        <View className="add-image">
          <Text>Add Image</Text>
        </View>
        <TextInput
          onChange={ImageSend}
          type="file"
          id="pic"
          className="form-control"
        />
        <Text htmlFor="pic">
          icona FaFileImage
        </Text>
      </View>

      <View className="message-type">
        <TextInput
          type="text"
          onChange={inputHendle}
          onKeyPress={handleKeyPress}
          name="message"
          id="message"
          placeholder="Aa"
          className="form-control"
          value={newMessage}
        />
        <View className="file hover-gift">
          <Text htmlFor="emoji"> 😄 </Text>
        </View>
      </View>

      <View onClick={sendMessage} className="file">
        <Text>icona FaPaperPlane</Text>
      </View>

      <View className="emoji-section">
        <View className="emoji">
          {emojis.map((e) => (
            <Text onClick={() => emojiSend(e)}>{e}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default MessageSend;
