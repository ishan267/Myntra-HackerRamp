import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from "../../constants/Colors";
import * as chatroomAction from '../../store/actions/chatroom';
import { useSelector, useDispatch } from 'react-redux';
import user from "../../models/user";

const CustomModal = (props) => {
    
  const dispatch=useDispatch();
  const modalVisible = props.visible;
  const setModalVisible = props.setModalVisible;
  const [chatroomName,setChatroomName]=useState(null);
  const userId = useSelector((state) => state.auth.userId);

 

    const onTextChangeHandler=(e)=>{
      
      setChatroomName(e)
    }

    const onCancelHandler=()=>{
       
       setModalVisible(!modalVisible);
       setChatroomName(null);
    }

    
    const onSubmitHandler=()=>{
      if(chatroomName===null ||chatroomName===""){
        Alert.alert("Plese enter the name");
      }else{
        if(props.type==='chatroom'){
          setModalVisible(!modalVisible);
          console.log("selected friends are",props.selectedFriends);
          let chosenIds=[];
          for(let i=0;i<props.selectedFriends.length;i++)
                chosenIds.push(props.selectedFriends[i].id);
          chosenIds.push(userId);
          let newroom = {
            id : new Date().getTime(),
            name : chatroomName,
            adminId : userId,
            usersId : chosenIds.slice(),
            messagesId : []
          }
          console.log("new room is",newroom);
          dispatch(chatroomAction.createChatroom(newroom));
          props.navigation.navigate('ChatOverview',{selectedFriends:props.selectedFriends,chatroomName:chatroomName});
          setChatroomName(null);
        }
        if(props.type==='session'){
          setModalVisible(!modalVisible);
          props.navigation.navigate('VirtualShopOverview',{selectedFriends:props.selectedFriends,sessionData:{}})
        }
      }
      
    }

  const [date, setDate] = useState(new Date());
  const [time,setTime]=useState("");
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const currdate=new Date().getDate();
  const currtime=new Date().getTime();

  // console.log("curr date",currdate,currtime);

  const onChange = (event, selectedDate) => {
    
    const currentDate = selectedDate || date;
    
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log("event",event,currentDate)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
    
 
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
           {props.type==='chatroom' ? 
           (<View style={{height:30}}>
              <TextInput
                  placeholder="Enter chatroom name"
                  onChangeText={onTextChangeHandler}
                  value={chatroomName}
                  style={{backgroundColor:'white'}}
              />

           </View >):
           (
             <>
         <View style={styles.actions}>
        <Text onPress={showDatepicker}> Select Date</Text>
      </View>
      <Text></Text>   
      <View style={styles.actions}>
        <Text onPress={showTimepicker}> Select Time</Text>
      </View>
      <Text></Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
     
            
              </>
           )
           
          }
          <View style={{flexDirection:'row',marginTop:75,}}>
        <View style={[styles.actions,{backgroundColor:'red',marginRight:50}]}>
        <Text style={{color:'white',paddingTop:5}}  onPress={onCancelHandler}> Cancel</Text>  
        </View>
        <View style={[styles.actions,{backgroundColor:'green'}]}>
            <Text style={{color:'white',paddingTop:5}} onPress={onSubmitHandler}> Submit </Text>
        </View>

        
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
    width:80,
    height:30,
    borderRadius:10,
  
  },
});

export default CustomModal;