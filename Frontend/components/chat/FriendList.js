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
      const{Data,type,button}=props;
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

        //  console.log("selected",selectedFriends);

      }

      const onPressHandler=()=>{

           if(type==='share'){
              
           }

           if(type==='chatroom'){

           }

           if(type==='session'){

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
        <View style={styles.buttonCont}
           
          >
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