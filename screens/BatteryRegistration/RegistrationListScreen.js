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
import * as batteryRegistrationAction from "../../store/actions/registration";
import { Item } from "react-navigation-header-buttons";

const RegistrationListScreen = (props) => {
  const previouslyRegisteredBattery = useSelector(
    (state) => state.registration.prevRegistration
  );
  const dispatch = useDispatch();

    console.log(props);

  const navigation = props.navigation;

    useLayoutEffect(() => {
        console.log(props);
        navigation.setOptions({
            headerTitle: "Add New Battery",
        })
    }, [navigation]);

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
        {console.log(previouslyRegisteredBattery)}
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
