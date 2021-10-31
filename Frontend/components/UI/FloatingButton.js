import { FloatingAction } from "react-native-floating-action";
import {View,FlatList,Text,Platform,ActivityIndicator,StyleSheet,TextInput,Button} from 'react-native';
import Colors from '../../constants/Colors';


import React from "react";
const FloatingActionButton=(props)=>{
    const {onclick}=props

     return(
     <View style={
        {height:40,width:40,
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
        marginBottom:60
       }}
       onPress={onclick}
      >
    <Text style={{color:'white',fontSize:40}}  onPress={onclick} >+</Text>

</View>
 
  )
}

export default FloatingActionButton;