import React, { useEffect,useState } from 'react';
import {View,FlatList,Text,Platform,ActivityIndicator,StyleSheet} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as chatroomAction from '../../store/actions/chatroom'
import * as messagesAction from '../../store/actions/messages'
import * as friendsAction from '../../store/actions/friends';

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

const ChatOverviewScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);

    const dispatch=useDispatch();
    const chatrooms=useSelector(state=>state.chatroom.availableChatrooms);
    const messages=useSelector(state=>state.messages.allMessages);
    const friends=useSelector(state=>state.friends.allFriends);


    useEffect(()=>{
      setIsLoading(true);
      dispatch(chatroomAction.fetchChatroom()).then(() => {
      setIsLoading(false);
      console.log("chatrooms",chatrooms)
    });
    },[dispatch])

    useEffect(()=>{
      dispatch(messagesAction.fetchMessage()).then(()=>{console.log("messages",messages)})
    },[dispatch]);

    useEffect(()=>{
      dispatch(friendsAction.fetchFriends()).then(()=>{console.log("friends",friends)})
    },[dispatch])

    return (
      <Container>
        <FlatList 
          data={chatrooms}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('ChatDetails', {userName: item.userName})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
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
