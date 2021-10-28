import React, { useLayoutEffect, useState, useReducer, useCallback } from "react";
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
import InputBox from "../../components/InputBox";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// declare reducer outside to prevent re-creation of the function
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const RegistrationAddEdit = (props) => {
  const navigation = props.navigation;

  const initialFormState = {
    inputValues: {
      title: "",
      imageUrl: "",
      description: "",
      price: "",
    },
    inputValidities: {
      title: false,
      imageUrl: false,
      description: false,
      price: false,
    },
    formIsValid: false,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Battery",
    });
  }, [navigation]);

  const [formState, dispatchFormState] = useReducer(formReducer, initialFormState);

  const inputChangeHandler = useCallback(
    // passing args from Input components
    (inputIdentifier, inputValue, inputValidity) => {
        // console.log(inputIdentifier)
        // console.log(inputValue)
        // console.log(inputValidity)
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue, //value from child
        isValid: inputValidity, //isValid from child
        input: inputIdentifier, //inputId from child comp
      });
    },
    [dispatchFormState]
  );

  return (
    <View style={styles.container}>
      <TitleText>This is add new battery screen!</TitleText>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          <View style={styles.form}>
            <InputBox
              id="model"
              label="Model"
              errorText="Please enter a valid model!"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler}
            //   initialValue={""}
              //   initiallyValid={!!editedProduct}
              required
            />
            <InputBox
              id="dateInstalled"
              label="Date Installed"
              errorText="Please enter a valid date!"
              keyboardType="default"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler}
            //   initialValue={""}
              //   initiallyValid={!!editedProduct}
              required
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    width: "100%",
    width: 300,
  },
});

export default RegistrationAddEdit;
