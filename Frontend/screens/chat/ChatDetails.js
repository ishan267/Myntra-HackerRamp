import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {db,auth} from '../../firebase';
import * as messagesAction from '../../store/actions/messages';
import { useSelector, useDispatch } from 'react-redux';


const ChatDetailScreen = (props) => {
  //const [messages, setMessages] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const recId = props.navigation.getParam('recvId');
  const socket = props.navigation.getParam('socket');
  const tag = props.navigation.getParam('tag');
  //console.log("tag is",tag);
  const dispatch=useDispatch();

  const allMessages=useSelector(state=>state.messages.allMessages);
 // console.log("all msgs",allMessages);
  let roomMessages=[];
  if(tag=="1")      //personal msg
  {
    roomMessages=allMessages.filter((message)=>{
      if(message.tag==1 && (message.senderId==recId || message.receiverId==recId))
        return true;
      else
        return false;
    });
  }
  else{             //group msg
    roomMessages=allMessages.filter((message)=>{
      if(message.tag==0 && message.receiverId==recId)
        return true;
      else
        return false;
    });
  }
  
  let msglist = roomMessages.map((msg)=>{
    return(
      {
        _id: msg.id,
        text: msg.text,
        createdAt: msg.createdAt,
        user: {
          _id: msg.senderId,
        }
      }
    )
  })

  useEffect(() => {
    console.log("room messages changed");
    msglist.sort(function(a,b){
      return new Date(b.createdAt)-new Date(a.createdAt);
    });
    console.log("new msg list is",msglist);
  }, [msglist]);

  function sendPersonalMessage(msg)
    {
      console.log("socket personal message called",msg);
      socket.emit('createMessage',msg);
    }


  const onSend = useCallback((msg = []) => {
  
    //setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
    //msglist=GiftedChat.append(msglist, msg);
    //msglist.push(msg);
    const message={
      id: msg[0]._id,
      createdAt: msg[0].createdAt,
      text: msg[0].text,
      receiverId: recId,
      senderId: msg[0].user._id,
      tag: tag,
      productsDiscussed:''
    }
    console.log("message to be sent is",message);
    //addMessage action will be dispatched from here
    dispatch(messagesAction.addMessage(message));
    sendPersonalMessage(message);
  }, []);
  

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
      messages={msglist}
      showAvatarForEveryMessage={true}
      onSend={(msg) => onSend(msg)}
      user={{
            _id:userId
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
      headerTitle: navData.navigation.getParam('name'),
    
    };
  };

export default ChatDetailScreen;
