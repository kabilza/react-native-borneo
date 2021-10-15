import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleFont}>This is homescreen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
  },
  titleFont: {
      fontFamily: Fonts.primaryFont,
      fontSize: 25,
      fontWeight: "bold"
  }
});

export default HomeScreen;
