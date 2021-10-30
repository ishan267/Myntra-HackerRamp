import React, { useEffect,useState } from 'react';
import {View,FlatList,Text,Platform,ActivityIndicator,StyleSheet,TextInput,Button} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as chatroomAction from '../../store/actions/chatroom'
import * as messagesAction from '../../store/actions/messages'
import * as friendsAction from '../../store/actions/friends';
import Colors from '../../constants/Colors';

import '../../helper/UserAgent';
import SocketIOClient from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";


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
    const chatrooms=useSelector(state=>state.chatroom.availableChatrooms);
    const messages=useSelector(state=>state.messages.allMessages);
    const friends=useSelector(state=>state.friends.allFriends);


    useEffect(()=>{
      setIsLoading(true);
      dispatch(friendsAction.fetchFriends()).then(() => {
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
      console.log("current messages are ",messages);
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


    useEffect(()=>{
      dispatch(messagesAction.fetchMessage()).then(()=>{console.log("messages",messages)})
    },[dispatch]);

    useEffect(()=>{
      dispatch(friendsAction.fetchFriends()).then(()=>{console.log("friends",friends)})
    },[dispatch])
   
    // console.log("chatrooms",chatrooms)
    return (
      <>
      <Container>
        <FlatList 
          data={friends}
          keyExtractor={item=>item.uid}
          renderItem={({item}) => {
          

           return (
            
            <Card onPress={() => navigation.navigate('ChatDetails', {userName: item.uname,recvId:item.uid,socket:socket})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={require('../../assets/users/user-4.jpg')} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.uname}</UserName>
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
                    onPress={()=>navigation.navigate('NewFriend')}
          >
      <Text style={{color:'white',fontSize:40}}  onPress={()=>navigation.navigate('NewFriend')} >+</Text>

</View>
      </Container>
      
       
        
      
      </>
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
