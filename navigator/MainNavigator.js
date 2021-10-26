import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import HomeScreen from "../screens/HomeScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import SplashScreen from "../screens/SplashScreen";
import Colors from "../constants/Colors";
import SettingsScreen from "../screens/SettingsScreen";
import RegulationsScreen from "../screens/RegulationsScreen";
import RegistrationListScreen from "../screens/BatteryRegistration/RegistrationListScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.accentColor2,
  },
  headerTintColor: "white",
};

const afterLogin = ({ route }) => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: true,
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name="ios-home"
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
        initialParams={route}
      />
      <Stack.Screen
        name="RegulationsScreen"
        component={RegulationsScreen}
        options={{ 
          title: 'Battery Regulations',
          headerShown: true,
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name="ios-checkbox-outline"
              size={23}
              color={drawerConfig.tintColor}
            />
          )
         }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ 
          title: 'Settings',
          headerShown: true,
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name="ios-settings"
              size={23}
              color={drawerConfig.tintColor}
            />
          )
         }}
      />
      <Stack.Screen
        name="RegistrationListScreen"
        component={RegistrationListScreen}
        options={{ 
          title: 'Registration List',
          headerShown: true,
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name="ios-list-sharp"
              size={23}
              color={drawerConfig.tintColor}
            />
          )
         }}
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
      <Stack.Screen
        name="RegistrationListScreen"
        component={RegistrationListScreen}
        options={{ 
          headerShown: true
         }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
