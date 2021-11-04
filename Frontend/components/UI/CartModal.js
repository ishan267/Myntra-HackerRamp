import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,ActivityIndicator,FlatList} from "react-native";
import { Button, TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from "../../constants/Colors";
import * as chatroomAction from '../../store/actions/chatroom';
import { useSelector, useDispatch } from 'react-redux';
import user from "../../models/user";
import { Ionicons } from "@expo/vector-icons";
import CartItem from '../shop/CartItem'
import Card from "./Card";

const CartModal = (props) => {
    
  const dispatch=useDispatch();
  const modalVisible = props.visible;
  const  setModalVisible= props. setModalVisible;


    const onCancelHandler=()=>{
     setModalVisible(!modalVisible);
     
    }

    const [isLoading, setIsLoading] = useState(false);

    const cartTotalAmount=10;
    const cartItems=[{
       productId:'1',
       productTitle:"shirt",
       productPrice:'100',
       quantity:10,
        sum:20

    }]

//   const cartTotalAmount = useSelector(state => state.cart.totalAmount);
//   const cartItems = useSelector(state => {
//     const transformedCartItems = [];
//     for (const key in state.cart.items) {
//       transformedCartItems.push({
//         productId: key,
//         productTitle: state.cart.items[key].productTitle,
//         productPrice: state.cart.items[key].productPrice,
//         quantity: state.cart.items[key].quantity,
//         sum: state.cart.items[key].sum
//       });
//     }
//     return transformedCartItems.sort((a, b) =>
//       a.productId > b.productId ? 1 : -1
//     );
//   });
//   const dispatch = useDispatch();

//   const sendOrderHandler = async () => {
//     setIsLoading(true);
//     await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
//     setIsLoading(false);
//   };
    
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

       <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {/* {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )} */}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            // onRemove={() => {
            //   dispatch(cartActions.removeFromCart(itemData.item.productId));
            // }}
          />
        )}
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
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartModal;