import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Fonts from "../constants/Fonts";

const TitleText = (props) => {
  return <Text style={styles.titleText}> {props.children} </Text>;
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: Fonts.primaryFont,
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default TitleText;
