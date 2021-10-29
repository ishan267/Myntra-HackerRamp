import React from "react";
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import SESSIONS from "../../data/session-dummy-data";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import { Card } from "react-native-elements";

const ShoppingSessionScreen = () => {


  const joinHandler = (id, title) => {
    // props.navigation.navigate("ProductDetail", {
    //   sessionId: id,
    //   sessioinTitle: title,
    // });
    console.log("clicked");
  };


  return (
    <View>
      <FlatList
        // onRefresh={loadProducts}
        // refreshing={isRefreshing}
        data={SESSIONS}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <Card>
            <Text>{itemData.item.title}</Text>
            <Button
              color={Colors.primary}
              title={itemData.item.time}
              onPress={() => {
                joinHandler(itemData.item.id, itemData.item.title);
              }}
            />
          </Card>
        )}
      />
    </View>
  );
};

ShoppingSessionScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Virtual Shopping Session",
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
  };
};


export default ShoppingSessionScreen;
