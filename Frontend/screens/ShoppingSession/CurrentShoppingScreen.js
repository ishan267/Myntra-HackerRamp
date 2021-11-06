import React, { useEffect, useState } from 'react';
navigator.__defineGetter__("userAgent", function () {   // you have to import rect native first !!
  return "react-native";
});
import SocketIOClient from "socket.io-client";
import { View, FlatList, Text, Platform, ActivityIndicator, StyleSheet, TextInput, Button, TouchableHighlight } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';

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
import { Ionicons } from "@expo/vector-icons";
import ChatModal from '../../components/UI/ChatModal';
import CartModal from '../../components/UI/CartModal';
import { useStore } from 'react-redux';

const CurrentShopppingScreen=(props)=>{

    const [toolTipVisible,setToolTipVisible]=useState(false);
    const[cartModalVisible,setCartModalVisible]=useState(false);
    const[chatModalVisible,setChatModalVisible]=useState(false);

    const users=useSelector(state=>state.users.availableUsers);
    console.log("current users are",users);
    //const friends=useSelector(state=>state.friends.allFriends);
    //console.log("friends are",friends);
    const membersId=props.navigation.getParam('members');
    const members=users.filter((friend)=>membersId.includes(friend.id));
    console.log("member ids are",membersId);
    console.log("members info are",members);
    const sessionMessages = useSelector(state => state.messages);
    console.log("all session messages are",sessionMessages);
    //const joinees=[];
    const [chosenId,setChosenId]=useState('');
    //let chosenId='123';
    const socket = SocketIOClient("https://social-commerce-myntra.herokuapp.com", {jsonp: false});
    const userId = useSelector((state) => state.auth.userId);
  useEffect(() => {
    console.log('socket about to connect to server');
    socket.on("connect", () => {
      console.log("connection successfull");
      console.log('my socket id is', socket.id);
      console.log('my userid is', userId);
      socket.emit('update-socket-id', userId, err => { })
    });
    socket.on('newMessage', (msg) => {
      console.log("socket id is", socket.id);
      console.log("socket message received is", msg);
      dispatch(messagesAction.addMessage(msg));
    })
    socket.on("connect_error", (err) => {
      console.log("Error");
      console.log(err instanceof Error);
      console.log(err.message);
    });
  }, []);

  function handleTooltip(frnd) {
    console.log("chosen friend to chat is", frnd);
    setChosenId(frnd.id);
    //chosenId=frnd.id;
    console.log("chosen id is", frnd.id);
    setToolTipVisible(!toolTipVisible);
  }

  const onPayHandler = () => {
    props.navigation.navigate('PayScreen');
  }


  return (
    <>
      <ChatModal
        visible={chatModalVisible}
        setModalVisible={setChatModalVisible}
        recId={chosenId}
        socket={socket}
      />
      <CartModal
        visible={cartModalVisible}
        setModalVisible={setCartModalVisible}
      />
      <Container>
        <FlatList

          data={members}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <Tooltip
                isVisible={toolTipVisible}

                content=
                {
                  <>
                    <View style={{ width: 150, height: 500 }}>
                      <View>
                        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 15 }}>{item.name}</Text>
                      </View>
                      <View style=
                        {{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          marginLeft: 40,

                        }} >

                        <Ionicons
                          name={Platform.OS === "android" ? "md-cart" : "ios-add"}
                          size={23}
                          color={Colors.primary}
                          onPress={() => setCartModalVisible(true)}
                        />
                        <View style={{ borderRightWidth: 1, borderColor: 'grey', paddingLeft: 10, marginRight: 10 }} />
                        <Ionicons
                          name={Platform.OS === "android" ? "chatbubbles" : "ios-add"}
                          size={23}
                          color={Colors.primary}
                          onPress={() => setChatModalVisible(true)}
                        />
                      </View>
                    </View>
                  </>

                }
                placement="top"
                onClose={() => setToolTipVisible(false)}
              >
                <TouchableHighlight >
                  <Card onPress={() => handleTooltip(item)}>
                    <UserInfo>
                      <UserImgWrapper>
                        <UserImg source={require('../../assets/users/user-4.jpg')} />
                      </UserImgWrapper>
                    </UserInfo>
                  </Card>
                </TouchableHighlight>
              </Tooltip>

            )
          }}
        />

      </Container>
    <View style={{backgroundColor:'white'}}>
      <View style={{ backgroundColor: Colors.primary, width: 95, height: 40, borderRadius: 10,marginLeft:290,marginBottom:30 }}>
          <Text
            style={{ color: 'white', paddingTop: 10, textAlign: 'center', paddingRight: 3 }}
            onPress={onPayHandler}
          >Pay</Text>
        </View>
        </View>

    </>
  )

}

CurrentShopppingScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('title'),
  };
};

export default CurrentShopppingScreen;