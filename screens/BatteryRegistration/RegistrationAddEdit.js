import React, { useLayoutEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Text,
  Input,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import * as batteryRegistrationAction from "../../store/actions/registration";
import BodyText from "../../components/BodyText";
import TitleText from "../../components/TitleText";

const RegistrationAddEdit = (props) => {
  // const { params } = props.route.params;
  const navigation = props.navigation;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Battery",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TitleText>This is add new battery screen!</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
  },
  form: {
    margin: 20,
  },
});

export default RegistrationAddEdit;
