import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Fonts from "../constants/Fonts";

const UserInformation = (props) => {
  if (props.customHeight) {
    return (
      <View style={{ height: props.customHeight }}>
        <View style={styles.container}>
          <View style={styles.infoData}>
            <Text style={styles.titleText}>{props.title}</Text>
            <Text style={styles.bodyText}>{props.data}</Text>
          </View>
          <View style={styles.iconStyles}>
            <Ionicons name={props.iconName} size={50} color="#A5A5A5" />
          </View>
        </View>
      </View>
    );
  }

  return (
      <View style={styles.container}>
        <View style={styles.infoData}>
          <Text style={styles.titleText}>{props.title}</Text>
          <Text style={styles.bodyText}>{props.data}</Text>
        </View>
        <View style={styles.iconStyles}>
          <Ionicons name={props.iconName} size={50} color="#A5A5A5" />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderBottomColor: "#A5A5A5",
    borderBottomWidth: 0.5,
    flex: 1,
  },
  titleText: {
    fontFamily: Fonts.primaryFont,
    fontSize: 20,
    fontWeight: "bold",
    color: "#A5A5A5",
  },
  bodyText: {
    fontFamily: Fonts.primaryFont,
    fontSize: 15,
    marginTop: 2,
    color: "black",
  },
  iconStyles: {
    flex: 1,
    alignItems: "flex-end",
  },
  infoData: {
    flex: 1,
  },
});

export default UserInformation;
