import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from "../../constants/Colors";
import * as chatroomAction from '../../store/actions/chatroom';
import * as sessionAction from '../../store/actions/sessions';
import { useSelector, useDispatch } from 'react-redux';
import user from "../../models/user";


const CustomModal = (props) => {
    
  const dispatch=useDispatch();
  const modalVisible = props.visible;
  const setModalVisible = props.setModalVisible;
  const [chatroomName,setChatroomName]=useState(null);

  const userId = useSelector((state) => state.auth.userId);
  const selectedFriends = props.selectedFriends;
  let friendsIds= [];
  let isSelected = new Map();
  isSelected.set(userId,true);
  for(let i=0;i<selectedFriends.length;i++)
  {
    if(selectedFriends[i].adminId==undefined)
        isSelected.set(selectedFriends[i].id,true);
    else 
    {
      for(let j=0;j<selectedFriends[i].usersId.length;j++)
        isSelected.set(selectedFriends[i].usersId[j],true);
    }
  }
  isSelected.forEach((value,key)=>{
    friendsIds.push(key);
  })

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

    const onTextChangeHandler=(e)=>{
      
      setChatroomName(e)
    }

    const onCancelHandler=()=>{
       
       setModalVisible(!modalVisible);
       setChatroomName(null);
    }
    
    const currdate=new Date().getDate();
    const currmonth=new Date().getMonth();
    const currYear=new Date().getFullYear();
    
    const onSubmitHandler=()=>{
      if( chatroomName===null ||chatroomName===""){
        Alert.alert("Plese enter the name");
      }else{
        if(props.type==='chatroom'){
          setModalVisible(!modalVisible);
          console.log("selected friends are",selectedFriends);
          let chosenIds=[];
          for(let i=0;i<selectedFriends.length;i++)
                chosenIds.push(selectedFriends[i].id);
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
          props.navigation.navigate('ChatOverview',{selectedFriends:selectedFriends,chatroomName:chatroomName});
          setChatroomName(null);
        }
        if(props.type==='session'){
          
           const selectedDate={
            date:date.getDate(),
            month:date.getMonth(),
            year:date.getFullYear()
           }

           const selectedTime={
             hour:date?.getHours(),
             minute:date?.getMinutes(),
           }

           if(selectedDate.year<currYear){
             Alert.alert("Invalid Date");
             return;
           }
           
           if(selectedDate.month<currmonth){
             if(selectedDate.year===currYear){
               Alert.alert("Invalid Date");
               return;
             }
           }

           if(selectedDate.date<currdate){
             if(selectedDate.month===currmonth){
               Alert.alert("Invalid Date");
               return;
             }
           }


          setModalVisible(!modalVisible);
          const sessionData={
            sessionName:chatroomName,
            date:selectedDate,
            time:selectedTime 
          }
          console.log("sessionData",sessionData);
          console.log("selected rooms/friends",selectedFriends);
          console.log("selected friend ids",friendsIds);
          let newSession={
            id : new Date().getTime(),
            title : sessionData.sessionName,
            date : sessionData.date,
            time : sessionData.time, 
            members : friendsIds.slice(),
            adminId : userId
          };
          console.log("new session to be created is",newSession);
          dispatch(sessionAction.createSession(newSession));
          props.navigation.navigate('VirtualShopOverview',{selectedFriends:selectedFriends,sessionData:sessionData})
        }
      }
      
    }

 
 

  // console.log("curr date",currdate,currtime);

  const onChange = (event, selectedDate) => {

  
      const currentDate = selectedDate || date;
    
      setShow(Platform.OS === 'ios');
      setDate(currentDate);  
      console.log("date",currentDate.getTime());
   
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
           
         <View style={[styles.actions,{backgroundColor:Colors.primary}]}>
        <Text onPress={showDatepicker} style={{fontWeight:"700",color:'white',paddingTop:5}}> Select Date</Text>
      </View>
      <View style={{flexDirection:'row',borderBottomColor:Colors.primary,borderBottomWidth:2}}>
      <Text>{date.getDate()}</Text> 
      <Text>/</Text>  
      <Text>{date.getMonth()}</Text>  
      <Text>/</Text>  
      <Text>{date.getFullYear()}</Text>   
      </View>
      
    
      <View style={[styles.actions,{backgroundColor:Colors.primary}]}>
        <Text onPress={showTimepicker} style={{fontWeight:"700",color:'white',paddingTop:5}}> Select Time</Text>
      </View>
      <View style={{flexDirection:'row',borderBottomColor:Colors.primary,borderBottomWidth:2}}>
      <Text>{date.getHours()}</Text> 
      <Text>:</Text>  
      <Text>{date.getMinutes()}</Text>  
    
      {/* <Text>{time.get}</Text>    */}
      </View>
   
     
      <View style={{height:30}}>
              <TextInput
                  placeholder="Enter session name"
                  onChangeText={onTextChangeHandler}
                  value={chatroomName}
                  style={{backgroundColor:'white'}}
              />

           </View >

      <Text></Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display='default'
          onChange={onChange}
          isDarkModeEnabled={true}
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