import React, { useState ,useCallback} from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from "../../constants/Colors";
import * as chatroomAction from '../../store/actions/chatroom';
import { useSelector, useDispatch } from 'react-redux';
import user from "../../models/user";
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from "@expo/vector-icons";

const CartModal = (props) => {
    
  const dispatch=useDispatch();
  const modalVisible = props.visible;
  const  setModalVisible= props. setModalVisible;
  const userId = useSelector((state) => state.auth.userId);


    const onCancelHandler=()=>{
       
       setModalVisible(!modalVisible);
     
    }

    const msglist=[
      {
        id:"1",
        createdAt:"10",
        text:"hello friend",
        receiverId:"198927",
        senderId:"7867",
        tag:'chat',
        productsDiscussed:'',
        image:''
       }
    ]

    const onSend = useCallback((msg = []) => {

      //msglist.push(msg);
      // const message={
      //   id: msg[0]._id,
      //   createdAt: msg[0].createdAt,
      //   text: msg[0].text,
      //   receiverId: recId,
      //   senderId: msg[0].user._id,
      //   tag: tag,
      //   productsDiscussed:'',
      //   image:''
      // }
      console.log("message to be sent is");
      //addMessage action will be dispatched from here
      // dispatch(messagesAction.addMessage(message));
      // sendPersonalMessage(message);
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
   
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
          <View style={styles.centeredView}>
          <View style={{flexDirection:'row',marginTop:75,}}>
           <View style={styles.modalView}>
         <View style={{height:400,width:300}}>
         <View style={[styles.actions,{backgroundColor:'red',marginLeft:310,marginTop:-45}]}>
          <Ionicons
          name={Platform.OS === "android" ?"md-close":"ios-add"}
          size={23}
          color='white'
          onPress={onCancelHandler}
         />   
       </View>
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
    </View>
     
     
     
        
          </View>
          </View>
          </View>
         

      </Modal>
  
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
 
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  actions: {
  
    alignItems: 'center',
    width:30,
    height:30,
    borderRadius:20,
  
  },
});

export default CartModal;