import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
//import SESSIONS from "../../data/session-dummy-data";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import { Card } from "react-native-elements";

const ShoppingSessionScreen = (props) => {
  const navigation=props.navigation
  const userId = useSelector((state) => state.auth.userId);
  const sessionList = useSelector((state) => state.sessions.availableSessions);  
  const userSessions = sessionList.filter((session)=>{

      for(let i=0;i<session.members.length;i++)
      {
        if(session.members[i]==userId)
            return true;
      }
      return false;
  })
  console.log("user id is",userId);
  console.log("all sessions",sessionList);
  console.log("current user sesion",userSessions);

  const joinHandler = (title,members) => {
    //console.log("title is",title);
    //console.log("joineers are",members);
    navigation.navigate("CurrentShoppping", {
      title: title,
      members:members
    });
   
  };


  return (
    <View>
      <FlatList
        // onRefresh={loadProducts}
        // refreshing={isRefreshing}
        style={{height:'95%'}}
        data={userSessions}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <Card>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>{itemData.item.title}</Text>
              <View style={{width:90}}>
                <Button
                  color={Colors.primary}
                  title={`${itemData.item.time.hour}:${itemData.item.time.minute}`}
                  onPress={()=>joinHandler(itemData.item.title,itemData.item.members)}
                />
              </View>
            </View>
          </Card>
        )}
      />
       <View style={styles.buttonCont} onPress={()=>navigation.navigate('FriendList')}>
      <Text style={{color:'white',fontSize:40}}  
      onPress={()=>navigation.navigate('FriendList',{title:"Create New Session",name:"session",})} >+</Text>

       </View>
    </View>
  );
};

ShoppingSessionScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Virtual Shopping Session",
  
  };
};

const styles=StyleSheet.create({
   buttonCont:{
    height:40,
    width:40,
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
    // marginBottom:'10%',
    marginTop:'-10%',
    
    zIndex:100
   }
})


export default ShoppingSessionScreen;
