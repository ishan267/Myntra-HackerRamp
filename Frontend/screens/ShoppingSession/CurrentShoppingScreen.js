import React, { useEffect,useState } from 'react';
import {View,FlatList,Text,Platform,ActivityIndicator,StyleSheet,TextInput,Button,TouchableHighlight} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Colors  from '../../constants/Colors';

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

const CurrentShopppingScreen=()=>{

    const [toolTipVisible,setToolTipVisible]=useState(false);
    const[cartModalVisible,setCartModalVisible]=useState(false);
    const[chatModalVisible,setChatModalVisible]=useState(false);

   

    const joinees=[
        {
            id:'1',
            name:'Ishan Thapa',
            

    },
    {
        id:'1',
        name:'Ishan Thapa',
        

}
]

    return(
       <>
       <ChatModal
            visible={chatModalVisible}
            setModalVisible={setChatModalVisible}
       />
       <CartModal
             visible={cartModalVisible}
             setModalVisible={setCartModalVisible}
       />

       <Container>
           <FlatList
           
           data={joinees}
           keyExtractor={item=>item.id}
           renderItem={({item}) => {
            return (
                <Tooltip
                isVisible={toolTipVisible}
                
                content=
                {
                   <>
                   <View style={{width:150,height:500}}>
                   <View>
                 <Text style={{textAlign:'center',fontWeight:'700',fontSize:15}}>{item.name}</Text>
                 </View>
                 <View style=
                 {{flexDirection:'row',
                 justifyContent:'flex-start',
                 marginLeft:40,
                
                 }} >  
                
                  <Ionicons
                     name={Platform.OS === "android" ? "md-cart":"ios-add"}
                     size={23}
                     color={Colors.primary}
                     onPress={()=>setCartModalVisible(true)}
                  />
                  <View  style={{borderRightWidth:1,borderColor:'grey',paddingLeft:10,marginRight:10}}/>
                  <Ionicons
                     name={Platform.OS === "android" ? "chatbubbles":"ios-add"}
                     size={23}
                     color={Colors.primary}
                     onPress={()=>setChatModalVisible(true)}
                  />
                 </View>
                 </View>
                 </>
            
               }
                 placement="top"
                 onClose={() =>setToolTipVisible(false)}
                  >
               <TouchableHighlight >
               <Card onPress={()=>setToolTipVisible(!toolTipVisible)}>
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
        
        </>
    )

}

export default CurrentShopppingScreen;