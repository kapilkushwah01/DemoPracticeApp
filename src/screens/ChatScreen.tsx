import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}
export default function ChatScreen() {

   const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hey, how are you?", sender: "other", time: "10:20 AM" },
    { id: "2", text: "I'm good! What about you?", sender: "me", time: "10:22 AM" },
    { id: "3", text: "All good here 😄", sender: "other", time: "10:23 AM" },
  ]);

   const flatListRef = useRef<FlatList>(null);

   const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 200);
  }, []);


  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar backgroundColor={'#8A5BFF'} hidden translucent={false} />
      <View style={styles.mainHeader}>
        <View style={styles.upperHeader}>
          <Icon name="arrow-back-outline" size={30} color={'white'} />
          <Icon name="ellipsis-vertical" size={30} color={'white'} />
        </View>
        <View style={styles.lowerHeader}>
          <View style={[styles.leftLowerView,{borderRadius:55,backgroundColor:"#8A5BFF"}]}>
            <Image
              source={require('../assets/boy.png')}
              style={{ height: '100%', width: '100%',borderRadius:10 }}
            />
          </View>
          <View style={[styles.leftLowerView, { width: '50%' }]}>
            <Text style={styles.nametext}>Kapil Kushwah</Text>
            <Text style={[styles.nametext,{fontSize:14}]}>Online</Text>
          </View>
          <View style={[styles.leftLowerView1, { width: '30%' }]}>
            <TouchableOpacity style={styles.whiteboxview}>
              <Icon name='call' size={25} color={'#8A5BFF'} style={{top:5}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.whiteboxview}>
              <Icon name='videocam' size={25} color={'#8A5BFF'} style={{top:5}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
         <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageRow,
              item.sender === "me" ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />
       <View style={styles.inputRow}>
        <TextInput
          placeholder="Type a message..."
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Icon name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3FF',
    // paddingHorizontal: 20,
  },
  mainHeader: {
    width: '100%',
    height: '30%',
    backgroundColor: '#8A5BFF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  upperHeader: {
    width: '90%',
    height: '30%',
    // borderWidth: 1,
    marginTop: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lowerHeader: {
    width: '90%',
    height: '30%',
    // borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftLowerView: {
    width: '15%',
    height: '80%',
    // borderWidth: 1,
  },
  leftLowerView1: {
    width: '15%',
    height: '80%',
    flexDirection:"row",
    justifyContent:'space-around',
    // borderWidth: 1,
  },
  nametext:{
    color:"white",
    fontSize:18,
    fontWeight:"600"
  },
  whiteboxview:{
     width: '35%',
    height: '60%',
    backgroundColor:"white",
    borderRadius:8,
    alignItems:"center",
  },
   inputRow: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#EEE",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendBtn: {
    backgroundColor: "#8A5BFF",
    marginLeft: 10,
    padding: 12,
    borderRadius: 30,
  },
   messageRow: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 16,
    marginVertical: 6,
  },

  myMessage: {
    backgroundColor: "#8A5BFF",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },

  otherMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },

  messageText: {
    fontSize: 15,
    color: "#000",
  },

  time: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
    alignSelf: "flex-end",
  },
});
