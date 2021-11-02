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
import { useSelector, useDispatch } from 'react-redux';
  
import Colors from "../constants/Colors";
  
import { Ionicons } from "@expo/vector-icons";
import { Searchbar } from 'react-native-paper';
import CustomModal from "../components/UI/CustomModal";

  const FriendsListScreen=(props)=>{
      const {state}= props.navigation
      const name=state.params.name;

      let button='';
      if(name==='share')  button='Send'

      const friends=useSelector(state=>state.friends.allFriends);

      const [allFriends,setAllFriends]=useState([]);
      const [selectedFriends,setSelectedFriends]=useState([]);
      const [modalVisible, setModalVisible] = useState(false);
      const[chatroomName,setChatroomName]=useState("");
      

      useEffect(()=>{
      friends.map((f)=>f.isSelected=false);
      setAllFriends(friends);
      },[])
      

      function handleSubmit()
      {
        if(state.params.name=='share')
        {

        }
        else if(state.params.name=="chatroom")
        {

        }
        else if(state.params.name=="session")
        {

        }
      }

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
         console.log("selected",selectedFriends)
      }

      const onPressHandler=()=>{

           if(name==='share'){
              props.navigation.navigate('ProductDetail')
           }

           if(name==='chatroom'){
               setModalVisible(true);
           }

           if(name==='session'){
               setModalVisible(true);

           }
          
      }
      const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

      return(
          <>
      <CustomModal visible={modalVisible} setModalVisible={setModalVisible}/>
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
                  <Ionicons
                     name={Platform.OS === "android" ? (item.isSelected===false ?"md-add":"md-remove") : (item.isSelected===false?"ios-add":"ios-remove")}
                     size={23}
                     color='white'
                     onPress={()=>onClickHandler(index)}
                  />
                  </View>
                </UserInfoText>
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
      </Container>
        
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