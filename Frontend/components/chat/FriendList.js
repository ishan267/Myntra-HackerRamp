import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";

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
  } from "../../styles/MessageStyles";
  
  import Colors from "../../constants/Colors";
  
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';
import { Searchbar } from 'react-native-paper';

  const FriendList=(props)=>{
      
      return(
          <>
        <FlatList
        data={dataSelected}
        keyExtractor={(item) => item.id}
        renderItem={({ item,index }) => (
          <Card>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>

                
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
      </>
      )
  }

  const styles=StyleSheet.create({
      iconCont:{
          borderRadius:20,
      },
      buttonCont:{
        height:40,
        width:75,
        backgroundColor:Colors.primary,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        zIndex:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 1,
       shadowRadius: 3,  
       elevation: 6,
        
       marginLeft:'80%',
       marginTop:'30%'
       
        
      },
      toast:{
          zIndex:100
      }
      

  })

  export default FriendList;