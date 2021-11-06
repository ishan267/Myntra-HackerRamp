import React, { useEffect, useState } from "react";
navigator.__defineGetter__("userAgent", function () {   // you have to import rect native first !!
  return "react-native";
 }); 
import SocketIOClient from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );
  console.log("selected product is",selectedProduct);
  const dispatch = useDispatch();

  const sessionList = useSelector((state) => state.sessions.availableSessions);
  const sessionCart = useSelector(state=>state.cart.sessionItems);
  const sesionAmount = useSelector(state=>state.cart.sessionAmount);
  //console.log("session cart is",sessionCart);
  //console.log("session amount is ",sesionAmount);

  /*const cart = useSelector(state=>state.cart.items);
  console.log("cart is",cart);
  const amount = useSelector(state=>state.cart.totalAmount);
  console.log("amount is ",amount);*/

  const userId = useSelector((state) => state.auth.userId);
  const socket = SocketIOClient("https://social-commerce-myntra.herokuapp.com", {jsonp: false});
  useEffect( ()=>{
    console.log('socket about to connect to server');
    socket.on("connect", () => {
      console.log("connection successfull");
      console.log('my socket id is', socket.id);
      console.log('my userid is', userId);
      socket.emit('update-socket-id',userId,err=>{})
    });
    socket.on('newMessage', (msg) => {
      console.log("socket id is",socket.id);
      console.log("socket message received is",msg);
      dispatch(messagesAction.addMessage(msg));
    })
    socket.on("connect_error", (err) => {
      console.log("Error");
      console.log(err instanceof Error);
      console.log(err.message); 
    });
  },[]);

  useEffect(()=>{
    console.log("session cart is",sessionCart);
    console.log("session amount is ",sesionAmount);
    console.log("session list is",sessionList);

  },[sessionCart])
       
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View  style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10}}>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="share"
          onPress={() => {
              props.navigation.navigate("FriendList", {
              product:selectedProduct,
              title:'Select',
              name:'share'
            });
          }}
        />
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to session cart"
          onPress={()=>{
            dispatch(cartActions.addToSessionCart(selectedProduct));
          }}
        />
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      </View>

     
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
   
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default ProductDetailScreen;
