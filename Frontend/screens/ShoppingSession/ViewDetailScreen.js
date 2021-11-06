import React from "react";
import {View,Text,FlatList} from 'react-native';
import { Card, Container } from "../../styles/MessageStyles";
import { UserInfo } from "../../styles/MessageStyles";
import { UserImgWrapper } from "../../styles/MessageStyles";
import { TextSection } from "../../styles/MessageStyles";
import { UserImg,UserInfoText ,UserName} from "../../styles/MessageStyles";
import Colors from "../../constants/Colors";

const ViewDetailScreen=()=>{
    const allFriends=[{
        id:1,
        name:"Ishan Thapa"
    }]

   return(
       <>
       <View style={{alignItems:'center',paddingVertical:10,backgroundColor:'white'}} >
       <Text style={{color:Colors.primary}}>Shoppping has not started yet</Text>
       </View >
       <View style={{paddingLeft:10,paddingVertical:10,backgroundColor:'white'}}>
       <Text style={{color:Colors.primary,fontWeight:'700',fontSize:18}}>Shopping Friends:</Text>
       </View>
       <Container>
      
       <FlatList
        data={allFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item,index }) => (
          <Card>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={require('../../assets/users/user-4.jpg')} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.name}</UserName>
                </UserInfoText>
             </TextSection>
            </UserInfo>
          </Card>
        )}
      />
      </Container>
      </>
     
   );
}
ViewDetailScreen.navigationOptions = (navData) => {
    return {
      headerTitle: navData.navigation.state.params.title,
    
    };
  };

export default ViewDetailScreen;