import React from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

/*
import {
  FaFileImage,
  FaPaperPlane,
} from "react-icons/fa";
*/

const MessageSend = ({
  inputHandle,
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
        <Text htmlFor="pic">icona FaFileImage</Text>
      </View>

      <View className="message-type">
        <TextInput
          type="text"
          onChangeText={(text) => inputHandle(text)}
          onKeyPress={handleKeyPress}
          name="message"
          placeholder="Aa"
          className="form-control"
          value={newMessage}
        />
        <View className="file hover-gift">
          <Text htmlFor="emoji"> 😄 </Text>
        </View>
      </View>

      <TouchableOpacity onPress={sendMessage}>
        <Text>icona FaPaperPlane</Text>
      </TouchableOpacity>

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
