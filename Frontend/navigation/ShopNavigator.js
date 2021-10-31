import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

import ChatOverviewScreen from "../screens/chat/ChatOverview";
import ChatDetailScreen from "../screens/chat/ChatDetails";
import ShoppingSessionScreen from "../screens/shop/ShoppingSessionScreen";
import NewSessionScreen from "../screens/ShoppingSession/NewSessionScreen";
import NewFriendScreen from "../screens/chat/NewFriendScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ChatsNavigator = createStackNavigator(
  {
    ChatOverview: ChatOverviewScreen,
    ChatDetails: ChatDetailScreen,
    NewFriend:NewFriendScreen
  },
  {
    // navigationOptions: {
    //   drawerIcon: (drawerConfig) => (
    //     <Ionicons
    //       name={Platform.OS === "android" ? "md-list" : "ios-list"}
    //       size={23}
    //       color={drawerConfig.tintColor}
    //     />
    //   ),
    // },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const VirtualShopNavigator = createStackNavigator(
  {
    VirtualShopOverview: ShoppingSessionScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const NewsessionNavigator = createStackNavigator(
  {
    NewSessionOverview: NewSessionScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-add" : "ios-add"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const SessionNavigator = createDrawerNavigator(
  {
    AllSessions: VirtualShopNavigator,
    NewSession: NewsessionNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      //const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 30 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 30 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                //props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const BottomNavigator = createBottomTabNavigator(
  {
    Products: ShopNavigator,
    Chats: ChatsNavigator,
    Group_Shopping: SessionNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Products") {
          iconName = `ios-home${focused ? "" : "-outline"}`;
        } else if (routeName === "Chats") {
          iconName = `ios-chatbubbles${focused ? "" : "-outline"}`;
        } else if (routeName === "Group_Shopping") {
          iconName = `ios-basket${focused ? "" : "-outline"}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: "black",
    },
  }
);

 const AuthNavigator = createStackNavigator(
   {
     Auth: AuthScreen
   },
   {
     defaultNavigationOptions: defaultNavOptions
   }
 );

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: BottomNavigator,
});
export default createAppContainer(MainNavigator);
