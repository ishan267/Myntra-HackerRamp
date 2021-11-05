import React, { useEffect,useState } from 'react';
import {View,FlatList,Text,Platform,ActivityIndicator,StyleSheet,TextInput,Button} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as chatroomAction from '../../store/actions/chatroom'
import * as messagesAction from '../../store/actions/messages'
import * as friendsAction from '../../store/actions/friends';
import Colors from '../../constants/Colors'
//import '../../helper/UserAgent';
navigator.__defineGetter__("userAgent", function () {   // you have to import rect native first !!
  return "react-native";
 }); 
import SocketIOClient from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import baseUrl from '../../helper/baseUrl';

import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
 
} from '../../styles/MessageStyles';
import message from '../../models/message';

const ChatOverviewScreen = ({navigation}) => {

    const userId = useSelector((state) => state.auth.userId);

    //const socket = SocketIOClient({baseUrl},{jsonp: false});
    const socket = SocketIOClient("https://social-commerce-myntra.herokuapp.com", {
          jsonp: false,
        });

    const [isLoading, setIsLoading] = useState(false);

    const dispatch=useDispatch();
    const friends=useSelector(state=>state.friends.allFriends);
    const chatrooms=useSelector(state=>state.chatroom.availableChatrooms);
    const messages=useSelector(state=>state.messages.allMessages);
    console.log("all messages are",messages);

    const chatList = friends.concat(chatrooms);

    useEffect(()=>{
      setIsLoading(true);
      dispatch(messagesAction.fetchMessage()).then(() => {
        setIsLoading(false);
    });
    },[dispatch])

    useEffect(()=>{
      setIsLoading(true);
      dispatch(friendsAction.fetchFriends()).then(() => {
        setIsLoading(false);
    });
    },[dispatch])

    useEffect(()=>{
      setIsLoading(true);
      dispatch(chatroomAction.fetchChatroom()).then(() => {
        setIsLoading(false);
    });
    },[dispatch])

    useEffect(()=>{
      console.log('socket about to connect to server');
      socket.on("connect", () => {
        console.log("connection successfull");
        console.log('my socket id is', socket.id);
        console.log('my userid is', userId);
        socket.emit('update-socket-id',userId,err=>{})
      });
      socket.on('newMessage', (msg) => {
        console.log("socket id is",socket.id);
        console.log("socket message received is",msg);
        dispatch(messagesAction.addMessage(msg));
      })
      socket.on("connect_error", (err) => {
        console.log("Error");
        console.log(err instanceof Error);
        console.log(err.message); 
      });
    },[]);
   
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  

    return (
      <>
      <Container>
        <FlatList 
          data={chatList}
          keyExtractor={item=>item.id}
          renderItem={({item}) => {
          
            //console.log("friendlist",friends);
            //console.log("roomlist",chatrooms);
           return (
            
            <Card onPress={() => navigation.navigate('ChatDetails',
            {name: item.name,recvId:item.id,tag:(item.adminId==undefined)?"1":"0",socket:socket}
            )}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={require('../../assets/users/user-4.jpg')} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.name}</UserName>
                    <PostTime>{'1 hours ago'}</PostTime>
                  </UserInfoText>
                  <MessageText>{'Hey there, this is my test for a post of my social app in React Native.'}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )
        }}
        />
         <View style={{height:40,width:40,
                     backgroundColor:Colors.primary,
                     borderRadius:20,
                     justifyContent:'center',
                     alignItems:'center', 
                     marginLeft:'80%',
                     shadowColor: '#000',
                     shadowOffset: { width: 0, height: 3},
                     shadowOpacity: 1,
                     shadowRadius: 3,  
                     elevation: 6,
                     marginBottom:60
                    }}
                    onPress={()=>navigation.navigate('FriendList')}
          >
      <Text style={{color:'white',fontSize:40}}  onPress={()=>navigation.navigate('FriendList',{title:"Create Chatroom",name:"chatroom"})} >+</Text>

</View>
      </Container>
      
       
        
      
      </>
    );
};

ChatOverviewScreen.navigationOptions = navData => {
  console.log("navdata in chat",navData)
  return {
    headerTitle: 'All Chats',

  };
};


const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchBar: {
    height: 45,
    padding: 10,
  },
});

export default ChatOverviewScreen;
