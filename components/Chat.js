import React, { useEffect, useRef, useState } from "react";
//import { FaEllipsisH, FaEdit, FaSistrix, FaSignOutAlt } from "react-icons/fa";
//import { Link } from "react-router-dom";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { userLogout } from "../store/actions/authAction";
import {
  ImageMessageSend,
  getFriends,
  getMessage,
  getTheme,
  messageSend,
  seenMessage,
  updateMessage,
} from "../store/actions/messengerAction";
import ActiveFriend from "./ActiveFriend";
import Messages from "./Messages";
//import useSound from "use-sound";
//import notificationSound from "../audio/notification.mp3";
//import sendingSound from "../audio/sending.mp3";

const Chat = () => {
  // const [notificationSPlay] = useSound(notificationSound);
  //const [sendingSPlay] = useSound(sendingSound);
  //const dispatch = useDispatch();
  const scrollRef = useRef();
  const socket = useRef();

  const {
    friends,
    message,
    mesageSendSuccess,
    message_get_success,
    themeMood,
    new_user_add,
  } = useSelector((state) => state.messenger);

  const { page, myInfo } = useSelector((state) => state.auth);

  const [currentfriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const [activeUser, setActiveUser] = useState([]);
  const [socketMessage, setSocketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });

    socket.current.on("typingMessageGet", (data) => {
      setTypingMessage(data);
    });

    socket.current.on("msgSeenResponse", (msg) => {
      dispatch({
        type: "SEEN_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });

    socket.current.on("msgDelivaredResponse", (msg) => {
      dispatch({
        type: "DELIVARED_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });

    socket.current.on("seenSuccess", (data) => {
      dispatch({
        type: "SEEN_ALL",
        payload: data,
      });
    });
  }, []);

  useEffect(() => {
    if (socketMessage && currentfriend) {
      if (
        socketMessage.senderId === currentfriend._id &&
        socketMessage.reseverId === myInfo.id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          payload: {
            message: socketMessage,
          },
        });
        dispatch(seenMessage(socketMessage));
        socket.current.emit("messageSeen", socketMessage);
        dispatch({
          type: "UPDATE_FRIEND_MESSAGE",
          payload: {
            msgInfo: socketMessage,
            status: "seen",
          },
        });
      }
    }
    setSocketMessage("");
  }, [socketMessage]);

  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);

  useEffect(() => {
    socket.current.on("getUser", (users) => {
      const filterUser = users.filter((u) => u.userId !== myInfo.id);
      setActiveUser(filterUser);
    });

    socket.current.on("new_user_add", (data) => {
      dispatch({
        type: "NEW_USER_ADD",
        payload: {
          new_user_add: data,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage.senderId !== currentfriend._id &&
      socketMessage.reseverId === myInfo.id
    ) {
      //notificationSPlay();
      //toast.success(`${socketMessage.senderName} Send a New Message`);
      dispatch(updateMessage(socketMessage));
      socket.current.emit("delivaredMessage", socketMessage);
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          msgInfo: socketMessage,
          status: "delivared",
        },
      });
    }
  }, [socketMessage]);

  const inputHandle = (text) => {
    setNewMessage(text);
    console.log(text);
    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      reseverId: currentfriend._id,
      msg: text,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      //sendingSPlay();
      const data = {
        senderName: myInfo.userName,
        reseverId: currentfriend._id,
        message: newMessage ? newMessage : " ",
      };

      socket.current.emit("typingMessage", {
        senderId: myInfo.id,
        reseverId: currentfriend._id,
        msg: "",
      });

      dispatch(messageSend(data));
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (mesageSendSuccess) {
      socket.current.emit("sendMessage", message[message.length - 1]);
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          msgInfo: message[message.length - 1],
        },
      });
      dispatch({
        type: "MESSAGE_SEND_SUCCESS_CLEAR",
      });
    }
  }, [mesageSendSuccess]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
    dispatch({ type: "NEW_USER_ADD_CLEAR" });
  }, [new_user_add]);

  useEffect(() => {
    if (friends && friends.length > 0) setCurrentFriend(friends[0].fndInfo);
  }, [friends]);

  useEffect(() => {
    dispatch(getMessage(currentfriend._id));
    if (friends.length > 0) {
    }
  }, [currentfriend?._id]);

  useEffect(() => {
    if (message.length > 0) {
      if (
        message[message.length - 1].senderId !== myInfo.id &&
        message[message.length - 1].status !== "seen"
      ) {
        dispatch({
          type: "UPDATE",
          payload: {
            id: currentfriend._id,
          },
        });
        socket.current.emit("seen", {
          senderId: currentfriend._id,
          reseverId: myInfo.id,
        });
        dispatch(seenMessage({ _id: message[message.length - 1]._id }));
      }
    }
    dispatch({
      type: "MESSAGE_GET_SUCCESS_CLEAR",
    });
  }, [message_get_success]);

  useEffect(() => {
    //scrollRef.scrollToEnd({ animated: true });
  }, [message]);

  const emojiSend = (emu) => {
    setNewMessage(`${newMessage}` + emu);
    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      reseverId: currentfriend._id,
      msg: emu,
    });
  };

  const ImageSend = (e) => {
    if (e.target.files.length !== 0) {
      //sendingSPlay();
      const imagename = e.target.files[0].name;
      const newImageName = Date.now() + imagename;

      socket.current.emit("sendMessage", {
        senderId: myInfo.id,
        senderName: myInfo.userName,
        reseverId: currentfriend._id,
        time: new Date(),
        message: {
          text: "",
          image: newImageName,
        },
      });

      const formData = new FormData();

      formData.append("senderName", myInfo.userName);
      formData.append("imageName", newImageName);
      formData.append("reseverId", currentfriend._id);
      formData.append("image", e.target.files[0]);
      dispatch(ImageMessageSend(formData));
    }
  };

  const [hide, setHide] = useState(true);

  const logout = () => {
    dispatch(userLogout());
    socket.current.emit("logout", myInfo.id);
    dispatch({
      type: "PAGE_LOGIN",
      payload: true,
    });
  };

  useEffect(() => {
    dispatch(getTheme());
  }, []);

  const search = (e) => {
    const getFriendClass = document.getElementsByClassName("hover-friend");
    const frienNameClass = document.getElementsByClassName("Fd_name");
    for (var i = 0; i < getFriendClass.length, i < frienNameClass.length; i++) {
      let text = frienNameClass[i].innerText.toLowerCase();
      if (text.indexOf(e.target.value.toLowerCase()) > -1) {
        getFriendClass[i].style.display = "";
      } else {
        getFriendClass[i].style.display = "none";
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            dispatch({
              type: "PAGE_SELECT_FRIEND",
              payload: true,
            });
          }}
        >
          <Icon name="arrow-back-circle" size={24} color="#222" />
        </TouchableOpacity>

        <View className="active-friends">
          {activeUser && activeUser.length > 0
            ? activeUser.map((u) => (
                <ActiveFriend setCurrentFriend={setCurrentFriend} user={u} />
              ))
            : ""}
        </View>

        <View className="image">
          <Image
            source={`${process.env.REACT_APP_API_BASE_URL}/api/chat/images/${myInfo.photo}`}
          />
        </View>

        <View className="name">
          <Text>{myInfo.userName}</Text>
        </View>

        <TouchableOpacity onPress={logout}>
          <Icon2 name="logout" size={24} color="#ff0000" />
        </TouchableOpacity>
      </View>

      {currentfriend ? (
        <Messages
          currentfriend={currentfriend}
          inputHandle={inputHandle}
          newMessage={newMessage}
          sendMessage={sendMessage}
          message={message}
          scrollRef={scrollRef}
          emojiSend={emojiSend}
          ImageSend={ImageSend}
          activeUser={activeUser}
          typingMessage={typingMessage}
        />
      ) : (
        <Text>Select your Friend</Text>
      )}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
    height: "100%",
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  paragraph: {
    padding: 14,
    fontSize: 15,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1.5,
    resizeMode: "cover",
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
    padding: 14,
    color: "#fff",
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
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
  header: {
    backgroundColor: "#f1f1f1",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    padding: 6,
    gap: 10,
  },
});
