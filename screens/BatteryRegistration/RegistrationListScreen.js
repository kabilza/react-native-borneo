import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../../components/Card";
import BatteryItem from "../../components/BatteryItem";
import TitleText from "../../components/TitleText";
import MyHeaderIcon from "../../components/MyHeaderIcon";
import * as batteryRegistrationAction from "../../store/actions/registration";
import { Item } from "react-navigation-header-buttons";

const RegistrationListScreen = (props) => {
  const previouslyRegisteredBattery = useSelector(
    (state) => state.registration.prevRegistration
  );

  useLayoutEffect(() => {
    // console.log(props);
    props.navigation.setOptions({
      headerTitle: "Previously Registered List",
      headerLeft: () => (
        <MyHeaderIcon
          iconName="ios-menu"
          style={{ marginLeft: -10 }}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      ),
      headerRight: () => (
        <MyHeaderIcon
          iconName="ios-create"
          style={{ marginRight: -4, marginBottom: 1 }}
          onPress={() => {
            props.navigation.push("RegistrationAddEdit");
          }}
        />
      ),
    });
  }, [props.navigation]);


  return (
    <View style={styles.container}>
      <TitleText>Previously Registered Battery</TitleText>
      <FlatList
        data={previouslyRegisteredBattery}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={(itemData) => (
          <BatteryItem
            barcode={itemData.item.barcode}
            brand={itemData.item.brand}
            model={itemData.item.model}
            type={itemData.item.type}
            warrantyPeriod={itemData.item.warrantyPeriod}
            dateInstalled={itemData.item.dateInstalled}
            shopName={itemData.item.shopName}
            shopProvince={itemData.item.shopProvince}
            shopDistrict={itemData.item.shopDistrict}
            shopPhoneNumber={itemData.item.shopPhoneNumber}
            batteryId={itemData.item.id}
            onSelect={() => {
              props.navigation.navigate("BatteryDetailScreen", { itemId: itemData.item.id });
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
  },
});

export default RegistrationListScreen;
