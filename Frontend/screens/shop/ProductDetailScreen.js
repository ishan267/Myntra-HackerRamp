import React, { useEffect, useState } from "react";
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

  const sessionCart = useSelector(state=>state.cart.sessionItems);
  console.log("session cart is",sessionCart);
       
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
          } }
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
