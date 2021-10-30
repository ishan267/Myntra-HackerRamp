import React, { useEffect,useState } from 'react';
import {View,FlatList,Text,Platform,ActivityIndicator,StyleSheet,TextInput,Button} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as chatroomAction from '../../store/actions/chatroom'
import * as messagesAction from '../../store/actions/messages'
import * as friendsAction from '../../store/actions/friends';

import '../../helper/UserAgent';
import SocketIOClient from "socket.io-client";

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
    const socket = SocketIOClient("http://localhost:8080",{jsonp: false});

    const [isLoading, setIsLoading] = useState(false);

    const dispatch=useDispatch();
    const friends=useSelector(state=>state.friends.allFriends);
    const chatrooms=useSelector(state=>state.chatroom.availableChatrooms);
    //const messages=useSelector(state=>state.messages.allMessages);

    const chatList = friends.concat(chatrooms);

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
      setIsLoading(true);
      dispatch(messagesAction.fetchMessage()).then(() => {
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
        console.log("message received is",msg);
        dispatch(messagesAction.addMessage(msg));
      })
    },[]);
   
    // console.log("chatrooms",chatrooms)
    return (
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
      </Container>
    );
};

ChatOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Chats',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};


export default ChatOverviewScreen;
