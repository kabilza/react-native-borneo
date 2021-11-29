import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image, Text } from "react-native";
import { useDispatch } from "react-redux";

import Fonts from "../constants/Fonts";
import * as authActions from "../store/actions/auth";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {

    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        console.log("cannot find user data");
        navigation.replace("AuthenticationScreen");
        return;
      }

      const transformedData = JSON.parse(userData);
      const {
        token,
        userId,
        expiryDate,
        displayName,
        briefInfo,
        phoneNumber,
        facebook,
        twitter,
        homeAddress,
        age,
        profileImage,
      } = transformedData;
      const expirationDate = new Date(expiryDate);

      const userProfile = {
        briefInfo: briefInfo,
        phoneNumber: phoneNumber,
        facebook: facebook,
        twitter: twitter,
        homeAddress: homeAddress,
        age: age,
        profileImage: profileImage,
      };

      if (expirationDate <= new Date() || !token || !userId) {
        console.log("token expired");
        navigation.replace("AuthenticationScreen");
        return;
      }

      navigation.replace("afterLogin");
      dispatch(
        authActions.authenticate(userId, token, displayName, userProfile)
      );
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
      <View style={styles.loadingTextContainer}>
        <Text style={styles.loadingText}>Now Loading, Please Wait...</Text>
      </View>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#307ecc",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  loadingText: {
    textAlign: "center",
    color: "white",
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: 20,
  },
  loadingTextContainer: {
    width: "80%",
  },
});
