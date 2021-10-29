import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useReducer,
  useCallback,
  createRef,
} from "react";
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
import MyHeaderIcon from "../../components/MyHeaderIcon";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// declare reducer outside to prevent re-creation of the function
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    let newState = {};
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
    newState = {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
    console.log(newState);
    return newState;
  }
  return state;
};

const RegistrationAddEdit = (props) => {
  const dateInstalledInput = createRef();
  const navigation = props.navigation;

  const dispatch = useDispatch();

  const initialFormState = {
    inputValues: {
      model: "",
      dateInstalled: "",
    },
    inputValidities: {
      model: false,
      dateInstalled: false,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialFormState
  );


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Battery",
      headerRight: () => {
        return (
          <MyHeaderIcon
            iconName="ios-checkmark"
            style={{ marginRight: -4, marginBottom: 1 }}
            onPress={submitHandler}
          />
        );
      },
    });
  }, [navigation, formState, submitHandler]);


  const inputChangeHandler = useCallback(
    // passing args from Input components
    (inputIdentifier, inputValue, inputValidity) => {
      // console.log(inputIdentifier)
      console.log("input from child " + inputIdentifier + " " + inputValue);
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

    const submitHandler = useCallback(() => {
      if (formState.formIsValid == false) {
        Alert.alert("Invalid input!", "Please check the errors in the form.", [
          { text: "Okay" },
        ]);
        return;
      }
      dispatch(
          batteryRegistrationAction.addNewBattery(
            formState
          )
      );
    }, [formState]);

  return (
    <View style={styles.container}>
      <TitleText>Register your new Battery</TitleText>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          <View style={styles.form}>
            <InputBox
              id="model"
              label="Battery Model"
              errorText="Please enter a valid model!"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                dateInstalledInput.current && dateInstalledInput.current.focus()
              }
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
              returnKeyType="done"
              ref={dateInstalledInput}
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
