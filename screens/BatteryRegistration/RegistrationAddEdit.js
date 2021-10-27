import React, { useLayoutEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as batteryRegistrationAction from "../../store/actions/registration";

const RegistrationAddEdit = ( props ) => {
    const { params } = props.route.params;
    const navigation = props.navigation;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Add New Battery",
        })
    }, [navigation]);

  return (
    <View>
      <Text>This is add new battery screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    form: {
      margin: 20
    }
  });

export default RegistrationAddEdit;
