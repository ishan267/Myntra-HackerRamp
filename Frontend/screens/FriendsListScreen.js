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
  } from "../styles/MessageStyles";
  
import Colors from "../constants/Colors";
  
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';
import { Searchbar } from 'react-native-paper';

const Data= [
    {
      id: "1",
      userName: "Jenny Doe",
      userImg: require("../assets/users/user-3.jpg"),
      messageTime: "4 mins ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "2",
      userName: "John Doe",
      userImg: require("../assets/users/user-1.jpg"),
      messageTime: "2 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "3",
      userName: "Ken William",
      userImg: require("../assets/users/user-4.jpg"),
      messageTime: "1 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "4",
      userName: "Selina Paul",
      userImg: require("../assets/users/user-6.jpg"),
      messageTime: "1 day ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "5",
      userName: "Christy Alex",
      userImg: require("../assets/users/user-7.jpg"),
      messageTime: "2 days ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    
  ];

  const FriendsListScreen=(props)=>{
      const {state}= props.navigation
      const name=state.params.name;
      console.log("name",name);
      let button='';
      if(name==='share')  button='Send'

      const data=[...Data];
      
      const [dataSelected,setSelectedState]=useState([]);
      const [selectedFriends,setSelectedFriends]=useState([]);

      useEffect(()=>{
        
        data.map((d)=>{d.isSelected=false});
        setSelectedState(data);
      },[])
    

      const onClickHandler=(index)=>{
          

         if(dataSelected[index].isSelected===false){
           
              const newData=[...dataSelected];
              newData[index].isSelected=true;
              setSelectedState(newData);
              
         }else{
              const id=dataSelected[index].id;
              console.log("id",id);
              const newData=[...dataSelected];
              newData[index].isSelected=false;
              setSelectedState(newData);
                   
         }
         const selectedFriends=dataSelected.filter((f)=>f.isSelected===true);
         setSelectedFriends(selectedFriends);

         console.log("selected",selectedFriends);

      }

      const onPressHandler=()=>{

           if(name==='share'){
              props.navigation.navigate('ProductDetail')
           }

           if(name==='chatroom'){

           }

           if(name==='session'){

           }
          
      }
      const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

      return(
          <>
   
      <Toast ref={(ref) => Toast.setRef(ref)} />
   
     <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    
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
                  <View style={[styles.iconCont,{backgroundColor:item.isSelected===true? 'red':'green'}]}> 
                  <Ionicons
                     name={Platform.OS === "android" ? (item.isSelected===false ?"md-add":"md-remove") : (item.isSelected===false?"ios-add":"ios-remove")}
                     size={23}
                     color='white'
                     onPress={()=>onClickHandler(index)}
                  />
                  </View>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>

                
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
        <View style={styles.buttonCont}>
        <Text style={{color:'white',fontSize:15,zIndex:10}}  onPress={onPressHandler} >
          {button===''?
          <Ionicons
          name={Platform.OS === "android" ?"md-arrow-forward":"ios-add"}
          size={23}
          color='white'
         />: button
          }
          </Text>

      </View>
        
      </>
      )
  }


  FriendsListScreen.navigationOptions = (navData) => {
   
    return {
      headerTitle: navData.navigation.state.params.title,
    };
  };

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
        
       marginLeft:'75%',
       marginBottom:'5%'
       
        
      },
      toast:{
          zIndex:100
      }
      

  })

  export default FriendsListScreen;