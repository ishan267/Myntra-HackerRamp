import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
navigator.__defineGetter__("userAgent", function () {   // you have to import rect native first !!
  return "react-native";
 }); 
import SocketIOClient from "socket.io-client";
import * as friendActions from '.././store/actions/friends';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton"
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Button,
  Alert,
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
  } from "../styles/MessageStyles";
  
import Colors from "../constants/Colors"; 
import { Ionicons } from "@expo/vector-icons";
import { Searchbar } from 'react-native-paper';
import CustomModal from "../components/UI/CustomModal";
import * as messagesAction from '.././store/actions/messages';
import { set } from "react-native-reanimated";
import user from "../models/user";

  const AddFriendScreen=(props)=>{

      const [searchQuery, setSearchQuery] = React.useState('');
      const onChangeSearch = query => setSearchQuery(query);
    
      
      const dispatch=useDispatch();
      //const friends=useSelector(state=>state.friends.allFriends);
      const userId = useSelector((state) => state.auth.userId);
      const allusers=useSelector(state=>state.users.availableUsers);
      const users = allusers.filter((member)=>member.id!=userId);
      console.log("current users are",users);

      
      const [allFriends,setAllFriends]=useState([]);
      const [selectedFriends,setSelectedFriends]=useState([]);
     

      useEffect(()=>{
        users.map((f)=>f.isSelected=false);
        setAllFriends(users);
      },[])
      
      const onClickHandler=(index)=>{
        let newData=[...allFriends];
         if(allFriends[index].isSelected===false)
          newData[index].isSelected=true; 
         else{
           newData[index].isSelected=false;
         }

         setAllFriends(newData);
         const selectedFriends=newData.filter((f)=>f.isSelected===true);
         setSelectedFriends(selectedFriends);
         console.log("all",allFriends);
         console.log("selected",selectedFriends);
         console.log("chosen friend is",allFriends[index]);
         dispatch(friendActions.addFriend(allFriends[index]));
      }

      const onPressHandler=()=>{
        let newData=[...allFriends];
        console.log("new data",newData);
        const filteredData=newData.filter( (f) => {f.isSelected===false});
        setAllFriends(filteredData);
        console.log("new",filteredData);
        props.navigation.navigate('ChatOverview',{addedFriends:selectedFriends})
          
      }
   

      return(
     <>
     <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    <Container>
     <FlatList
        data={allFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item,index }) => (
          <Card>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={require('../assets/users/user-4.jpg')} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.name}</UserName>
                  <View  style={[styles.iconCont,{backgroundColor:item.isSelected===true? 'red':'green'}]}> 
                  <Text  onPress={()=>onClickHandler(index)} style={{color:'white'}}>
                       {item.isSelected===false ? "Add":"Remove" }
                  </Text>
                  </View>
                </UserInfoText>
             </TextSection>
            </UserInfo>
          </Card>
        )}
      />
        <View style={styles.buttonCont}>
        <Text style={{color:'white',fontSize:15,zIndex:10}}  onPress={onPressHandler} >
            Done
          </Text>

      </View>
      </Container>
        
      </>
      )
  }


  AddFriendScreen.navigationOptions = (navData) => {
   
    return {
      headerTitle: 'Add Friend',
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    
    };

    
  };

  const styles=StyleSheet.create({
      iconCont:{
          borderRadius:5,
          height:30,
          width:60,
          alignItems:'center',
          justifyContent:'center'
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
        
       marginLeft:'75%',
       marginBottom:'5%'
       
        
      },
      toast:{
          zIndex:100
      }
      

  })

  export default AddFriendScreen;