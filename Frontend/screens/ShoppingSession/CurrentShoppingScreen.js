import React, { useEffect, useState, useRef } from 'react';
navigator.__defineGetter__("userAgent", function () {   // you have to import rect native first !!
  return "react-native";
});
import SocketIOClient from "socket.io-client";
import { View, FlatList, Text, Platform, ActivityIndicator, StyleSheet, TextInput, TouchableHighlight, ImageBackground } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import FloatingAnimation from '../../components/UI/FloatingAnimation';
import userImage from "../../assets/users/user-4.jpg"
import { Popover, Button, Box, Center, NativeBaseProvider } from "native-base"
import * as Animatable from 'react-native-animatable';
import UserAvatar from 'react-native-user-avatar';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

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
import { TouchableOpacity } from 'react-native-gesture-handler';

const CurrentShopppingScreen = (props) => {

  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);

  

  const users = useSelector(state => state.users.availableUsers);
  console.log("current users are", users);
  //const friends=useSelector(state=>state.friends.allFriends);
  //console.log("friends are",friends);
  const membersId = props.navigation.getParam('members');
  const members = users.filter((friend) => membersId.includes(friend.id));
  console.log("member ids are", membersId);
  console.log("members info are", members);
  const sessionMessages = useSelector(state => state.messages);
  console.log("all session messages are", sessionMessages);
  //const joinees=[];
  const [chosenId, setChosenId] = useState('');
  //let chosenId='123';
  const socket = SocketIOClient("https://social-commerce-myntra.herokuapp.com", { jsonp: false });
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
  const newCartItem = 2;
  const isPresent = true;

  
  return (
    <>
      <ImageBackground source={require('../../assets/background.png')} resizeMode='cover' style={{ width: '100%', height: '100%', }}>
        
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

        <FlatList

          data={members}
          style={{ height: '85%', backgroundColor: 'rgba(0,0,0,0.3)',paddingLeft:10}}
          keyExtractor={item => item.id}
          renderItem={({ item ,index}) => {
            return (
              <View style={{ paddingVertical: 20 ,paddingLeft:Math.floor(Math.random()*100*index)}}>
                <Popover
                
                 placement='bottom'
                  trigger={(triggerProps) => {
                    return (
                      <Text {...triggerProps}>
                        {isPresent === true ?
                          <View>
                            <Animatable.View animation="pulse"  iterationCount={'infinite'} direction="alternate">
                              <UserAvatar size={50} name={item.name} bgColors={['#ccc', '#4c1e3d', 'black', '#FF66CC', '#0095b6']} />
                              <Badge
                                status="success"
                                containerStyle={{ position: 'absolute', top: 1, right: 5 }}
                              />
                            </Animatable.View>
                          </View> :
                          <UserAvatar size={50} name={item.name} bgColors={['#ccc', '#4c1e3d', 'black', '#FF66CC', '#0095b6']} />
                        }


                      </Text>


                    )
                  }}
                >
                  <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                    <Popover.Arrow />
                    <Popover.CloseButton />
                    <Popover.Header>{item.name}</Popover.Header>
                    <Popover.Body>
                      <View style=
                        {{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',

                        }} >

                        <Ionicons
                          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                          size={23}
                          color={Colors.primary}
                          onPress={() => setCartModalVisible(true)}
                        />
                        {newCartItem > 0 && <Badge value={newCartItem} status="error" containerStyle={{ top: -3, right: 5 }} />}

                        <View style={{ borderRightWidth: 1, borderColor: 'grey', paddingLeft: 10, marginRight: 10 }} />
                        <Ionicons
                          name={Platform.OS === "android" ? "md-chatbubbles" : "ios-chatbubbles"}
                          size={23}
                          color={Colors.primary}
                          onPress={() => setChatModalVisible(true)}
                        />
                      </View>
                    </Popover.Body>
                  </Popover.Content>
                </Popover>
              </View>

            )
          }}
        />


        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <View style={{
            backgroundColor: Colors.primary, width: 95, height: 40, borderRadius: 20, marginBottom: 30, marginLeft: 280, shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5
          }}>
            <Text
              style={{ color: 'white', paddingTop: 10, textAlign: 'center', paddingRight: 3 }}
              onPress={onPayHandler}
            >Checkout</Text>
          </View>

          <View style={{
            overflow: 'hidden', marginBottom: -65, backgroundColor: 'orange', width: 120, height: 100, borderRadius: 90, marginLeft: 150, shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5
          }}>
            <Text
              style={{ color: 'black', paddingTop: 10, textAlign: 'center', paddingRight: 3, fontWeight: '700', fontSize: 17 }}
              onPress={() => { props.navigation.navigate('ProductsOverview') }}
            >Shop Now</Text>
          </View>
        </View>


      </ImageBackground>
    </>
  )

}

CurrentShopppingScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('title'),
  };
};

export default CurrentShopppingScreen;