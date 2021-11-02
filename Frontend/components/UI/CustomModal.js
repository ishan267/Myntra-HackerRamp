import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import DatePicker from 'react-native-date-picker'
import Colors from "../../constants/Colors";

const CustomModal = (props) => {
    
    
    const modalVisible=props.visible;
    const setModalVisible=props.setModalVisible;
    const [chatroomName,setChatroomName]=useState(null)

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

    const onTextChangeHandler=(e)=>{
      
      setChatroomName(e.target.value)
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
          props.navigation.navigate('ChatOverview',{selectedFriends:props.selectedFriends,chatroomName:chatroomName});
          setChatroomName(null);
        }
        if(props.type==='session'){
          setModalVisible(!modalVisible);
          props.navigation.navigate('VirtualShopOverview',{selectedFriends:props.selectedFriends,sessionData:{}})
        }
      }
      
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
           {props.type==='chatroom' ? 
           (<View style={{height:30}}>
              <TextInput
                  placeholder="Enter chatroomm name"
                  onChange={onTextChangeHandler}
                  value={chatroomName}
                  style={{backgroundColor:'white'}}
              />

           </View >):
           (
             <>
             {/* <DatePicker date={date} onDateChange={setDate} /> */}
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