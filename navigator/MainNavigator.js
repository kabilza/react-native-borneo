import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import HomeScreen from "../screens/HomeScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import SplashScreen from "../screens/SplashScreen";
import Colors from "../constants/Colors";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.accentColor2,
  },
  headerTintColor: "white",
};

const afterLogin = ( {route} ) => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: true }}
        initialParams={route}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
        screenOptions={defaultScreenOptions}
      />
      <Stack.Screen
        name="AuthenticationScreen"
        component={AuthenticationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="afterLogin"
        component={afterLogin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
