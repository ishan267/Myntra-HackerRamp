import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {db,auth} from '../../firebase';
import * as messagesAction from '../../store/actions/messages';
import { useSelector, useDispatch } from 'react-redux';

const ChatDetailScreen = () => {
  const [messages, setMessages] = useState([]);
  //const [messageRef, setMessageRef] = useState(db.ref('/messages'));

  const dispatch=useDispatch();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
       
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
        
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const {_id, createdAt, text, user} = messages[0];
    //messageRef.push({from: user, message: text});
  }, []);

  const onSendHandler=(message)=>{
    //addMessage action will be dispatched from here
     dispatch(messagesAction.addMessage(message));
  }
  

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => {console.log("m",messages),onSend(messages)}}
      user={{
            _id:auth?.currentUser?.email,
            name:auth?.currentUser?.displayName
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


ChatDetailScreen.navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('userName'),
    
    };
  };

export default ChatDetailScreen;
