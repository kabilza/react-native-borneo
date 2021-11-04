import { NavigationContainer, Link } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import MyHeaderIcon from "../components/MyHeaderIcon";
import HomeScreen from "../screens/HomeScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import SplashScreen from "../screens/SplashScreen";
import Colors from "../constants/Colors";
import SettingsScreen from "../screens/SettingsScreen";
import RegulationsScreen from "../screens/RegulationsScreen";
import RegistrationListScreen from "../screens/BatteryRegistration/RegistrationListScreen";
import RegistrationAddEdit from "../screens/BatteryRegistration/RegistrationAddEdit";
import BatteryDetailScreen from "../screens/BatteryRegistration/BatteryDetailScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BatteryRegistrationStack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.accentColor2,
  },
  headerTintColor: "white",
};

const registrationScreens = (props) => {
  const { route } = props.route;
  return (
    <BatteryRegistrationStack.Navigator
      initialRouteName="RegistrationListScreen"
      screenOptions={{ ...defaultScreenOptions }}
    >
      <Stack.Screen
        name="RegistrationListScreen"
        component={RegistrationListScreen}
      />
      <Stack.Screen
        name="BatteryDetailScreen"
        component={BatteryDetailScreen}
      />
      <Stack.Screen
        name="RegistrationAddEdit"
        component={RegistrationAddEdit}
        options={{}}
      />
    </BatteryRegistrationStack.Navigator>
  );
};

const afterLogin = (props) => {
  const route = props.route;
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        ...defaultScreenOptions,
        gesturesEnabled: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
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
          title: "Battery Regulations",
          headerShown: true,
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name="ios-checkbox-outline"
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="LinkToRegistrationStack"
        component={registrationScreens}
        options={{
          title: "Registration List",
          headerShown: false,
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name="ios-list-sharp"
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerShown: true,
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name="ios-settings"
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{...defaultScreenOptions, gesturesEnabled: false}}
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
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="afterLogin"
        component={afterLogin}
        options={{
          headerShown: false,
          gesturesEnabled: false
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
