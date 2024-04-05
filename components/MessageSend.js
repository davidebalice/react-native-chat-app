import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

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
  const [viewEmoji, setViewEmoji] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    // L'utente ha selezionato un'immagine
    console.log(pickerResult.uri);
  };

  return (
    <View style={styles.messageContainer}>
      <TouchableOpacity onPress={openImagePicker}>
        <Icon name="image" size={24} color="#222" />
      </TouchableOpacity>

      <TextInput
        type="text"
        onChangeText={(text) => inputHandle(text)}
        onKeyPress={handleKeyPress}
        name="message"
        placeholder="Aa"
        className="form-control"
        value={newMessage}
        style={styles.inputMessage}
      />
      <TouchableOpacity onPress={() => setViewEmoji(!viewEmoji)}>
        <Text style={styles.emojiIcons}> 😄 </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={sendMessage}>
        <Icon name="send" size={24} color="#222" />
      </TouchableOpacity>
      {viewEmoji && (
        <View style={styles.emojiContainer}>
          {emojis.map((e) => (
            <TouchableOpacity onPress={() => emojiSend(e)}>
              <Text style={styles.emojiIcons}>{e}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default MessageSend;

const styles = StyleSheet.create({
  emojiContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    height: 120,
    left: 0,
    right: 0,
    bottom: 58,
    gap: 10,
    padding: 20,
    flexWrap: "wrap",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    display: "flex",
    gap: 10,
    flexDirection: "row",
    position: "absolute",
    height: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "ff0000",
  },
  inputMessage: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "60%",
    padding: 2,
  },
  emojiIcons: {
    fontSize: 22,
  },
});
