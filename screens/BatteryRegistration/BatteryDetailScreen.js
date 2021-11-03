import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../../components/Card";
import BatteryItem from "../../components/BatteryItem";
import TitleText from "../../components/TitleText";
import MyHeaderIcon from "../../components/MyHeaderIcon";
import Colors from "../../constants/Colors";
import * as batteryRegistrationAction from "../../store/actions/registration";


const BatteryDetailScreen = (props) => {
  const allBattery = useSelector(
    (state) => state.registration.prevRegistration
  );

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Registration Details",
      headerRight: () => (
        <MyHeaderIcon
          iconName="ios-trash"
          style={{ marginLeft: -10 }}
          onPress={confirmDelete}
        />
      ),
    });
  }, [props.navigation]);

  let selectedId = props.route.params.itemId;
  let copiedItem = allBattery.map((item) => item);
  let filteredItem = copiedItem.find((item) => item.id == selectedId);

  const confirmDelete = () => {
    Alert.alert("Are you sure?", "This item will be deleted. Continue?", [{ text: "Yes", onPress: deleteHandler, style: 'destructive' }, { text: "No", style: 'cancel' }])
  }

  const deleteHandler = () => {
    props.navigation.goBack();
    console.log('delete id ' + selectedId)
    dispatch(batteryRegistrationAction.removeBattery(selectedId))
    Alert.alert("Deleted!", "Item Deleted!", [{ text: "Okay" }]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.titleContainer}>
          <TitleText>Battery Details</TitleText>
        </View>
        <View style={styles.bodyTextContainer}>
          <Text style={styles.bodyDetails}>Battery Model: {filteredItem.model}</Text>
          <Text style={styles.bodyDetails}>
            Date Installed: {filteredItem.dateInstalled}
          </Text>
          <Text style={styles.bodyDetails}>
            Battery Brand: {filteredItem.brand}
          </Text>
          <Text style={styles.bodyDetails}>
            Battery Model: {filteredItem.model}
          </Text>
          <Text style={styles.bodyDetails}>
            Battery Barcode: {filteredItem.barcode}
          </Text>
          <Text style={styles.bodyDetails}>
            Battery Type: {filteredItem.type}
          </Text>
          <Text style={styles.bodyDetails}>
            Warranty Period: {filteredItem.warrantyPeriod}
          </Text>
          <Text style={styles.bodyDetails}>
            Shop Name: {filteredItem.shopName}
          </Text>
          <Text style={styles.bodyDetails}>
            Shop Province: {filteredItem.shopProvince}
          </Text>
          <Text style={styles.bodyDetails}>
            Shop District: {filteredItem.shopDistrict}
          </Text>
          <Text style={styles.bodyDetails}>
            Shop Phone Number: {filteredItem.shopPhoneNumber}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.accentColor2,
    paddingVertical: 15,
  },
  bodyDetails: {
    fontSize: 15,
    color: "black",
    marginBottom: 5
  },
  listContainer: {
    flex: 1,
    paddingVertical: 20,
    width: "90%",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
    padding: 10,
    marginVertical: 15,
    backgroundColor: "white",
    borderRadius: 5,
  },
  bodyTextContainer: {
      alignItems: 'center',
      justifyContent: 'center'
  },
});

export default BatteryDetailScreen;
