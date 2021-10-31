import React from "react";
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { SearchBar, FAB } from "react-native-elements";
import Colors from "../../constants/Colors";
import FloatingActionButton from "../../components/UI/FloatingButton";
import { Ionicons } from "@expo/vector-icons";

import FriendList from "../../components/chat/FriendList";
import { addFriends } from "../../store/actions/friends";

const AllFriends= [
    {
      id: "1",
      userName: "Jenny Doe",
      userImg: require("../../assets/users/user-3.jpg"),
      messageTime: "4 mins ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "2",
      userName: "John Doe",
      userImg: require("../../assets/users/user-1.jpg"),
      messageTime: "2 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "3",
      userName: "Ken William",
      userImg: require("../../assets/users/user-4.jpg"),
      messageTime: "1 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "4",
      userName: "Selina Paul",
      userImg: require("../../assets/users/user-6.jpg"),
      messageTime: "1 day ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "5",
      userName: "Christy Alex",
      userImg: require("../../assets/users/user-7.jpg"),
      messageTime: "2 days ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
  ];
  

const NewFriendScreen=(props)=>{
    const{state}=props.navigation;
    const name=state.params.name
    let buttonType="";
    if(name==='share'){
      buttonType='Send'
    }

  return (
      
    <View style={styles.body}>
       <FriendList Data={AllFriends}  type={name} button={buttonType}/>
     </View>
      
  );
}

NewFriendScreen.navigationOptions = (navData) => {
  console.log("navdata",navData.navigation.state.params.title);
  return {
    headerTitle: navData.navigation.state.params.title,
  };
};

const styles = StyleSheet.create({
    body: { padding: 10 },
  });

export default NewFriendScreen