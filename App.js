import { StatusBar } from "expo-status-bar";
import React from "react";
import {Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthenticationScreen from "./screens/AuthenticationScreen";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";

import registrationReducer from "./store/reducers/registration";

import MainNavigator from "./navigator/MainNavigator";

const rootReducer = combineReducers({
  registration: registrationReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
