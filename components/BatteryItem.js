import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "./Card";

const BatteryItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.batteryItem}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect}>
          <View>
            <View style={styles.details}>
              <Text style={styles.title}>Battery Model: {props.model}</Text>
              <Text style={styles.bodyDetails}>Date Installed: {props.dateInstalled}</Text>
              <Text style={styles.bodyDetails}>ID: {props.batteryId}</Text>
            </View>
            {/* <View style={styles.actions}>{props.children}</View> */}
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  batteryItem: {
    margin: 10,
    width: 300,
    backgroundColor: "#888",
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  details: {
    alignItems: "center",
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  bodyDetails: {
    fontSize: 14,
    color: "black",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
});

export default BatteryItem;
