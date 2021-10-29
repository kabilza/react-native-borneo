import React, { useLayoutEffect, useState} from "react";
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
  const dispatch = useDispatch();
  
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
                    props.navigation.push('RegistrationAddEdit')
                  }}
                />
              ),
        })
    }, [props.navigation]);

  return (
    <View style={styles.container}>
      <TitleText>Previously Registered Battery</TitleText>
        <FlatList
          data={previouslyRegisteredBattery}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <BatteryItem
              model={itemData.item.model}
              details={itemData.item.dateInstalled}
              onSelect={() => {
                console.log("item selected");
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
//   listContainer: {
//     width: "100%",
//     height: 30,
//     padding: 20,
//   },
//   homeCard: {
//     alignItems: "center",
//     marginBottom: 10,
//     width: "70%",
//     height: 150,
//     justifyContent: "center",
//   },
});

export default RegistrationListScreen;
