import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import * as chatroomAction from '../../store/actions/chatroom'
import * as messagesAction from '../../store/actions/messages'
import * as friendsAction from '../../store/actions/friends';
import Colors from "../../constants/Colors";
import { Searchbar } from 'react-native-paper';

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadItems = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
     // await dispatch(chatroomAction.addSocket());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadItems
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadItems]);

  useEffect(() => {
    setIsLoading(true);
    loadItems().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadItems]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadItems}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <View>
       <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    
      <FlatList
        onRefresh={loadItems}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Myntra",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchBar: {
    height: 45,
    padding: 10,
  },
});

export default ProductsOverviewScreen;
