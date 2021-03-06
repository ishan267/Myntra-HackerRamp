import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';
import authReducer from './store/reducers/auth';
import chatroomReducer from './store/reducers/chatroom';
import friendsReducer from './store/reducers/friends';
import messagesReducer from './store/reducers/messages';
import sessionReducer from './store/reducers/sessions';
import usersReducer from './store/reducers/users';

import NavigationContainer from './navigation/NavigationContainer';
import { NativeBaseProvider } from 'native-base';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
  chatroom:chatroomReducer,
  friends:friendsReducer,
  messages:messagesReducer,
  sessions:sessionReducer,
  users:usersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <NativeBaseProvider>
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err)=>console.log(err)}
      />
      </NativeBaseProvider>
    );
  }
  return (
    <NativeBaseProvider>
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
    </NativeBaseProvider>
  );
}
