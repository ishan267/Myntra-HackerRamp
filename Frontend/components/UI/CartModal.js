import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from "../../constants/Colors";
import * as chatroomAction from '../../store/actions/chatroom';
import { useSelector, useDispatch } from 'react-redux';
import user from "../../models/user";
import { Ionicons } from "@expo/vector-icons";


const CartModal = (props) => {
    
  const dispatch=useDispatch();
  const modalVisible = props.visible;
  const  setModalVisible= props. setModalVisible;


    const onCancelHandler=()=>{
     setModalVisible(!modalVisible);
     
    }
    
  return (
   
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
      
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
         
   
        <View style={{height:400,width:300}}>
         <View style={[styles.actions,{backgroundColor:'red',marginLeft:310,marginTop:-45}]}>
          <Ionicons
          name={Platform.OS === "android" ?"md-close":"ios-add"}
          size={23}
          color='white'
          onPress={onCancelHandler}
         />   
       </View>
       </View>
     
     
        
          <View style={{flexDirection:'row',marginTop:75,}}>
        
          </View>
          </View>
          </View>
         

      </Modal>
  
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
 
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
    width:30,
    height:30,
    borderRadius:20,
  
  },
});

export default CartModal;