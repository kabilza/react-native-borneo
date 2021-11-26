import React, {
  useLayoutEffect,
  useState,
  createRef,
  useReducer,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import MyHeaderIcon from "../components/MyHeaderIcon";
import InputBox from "../components/InputBox";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import DummyItem from "../components/DummyItem";
import Card from "../components/Card";

import * as authActions from "../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

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

const SettingsScreen = ({ navigation, route }) => {
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const userTokenId = useSelector((state) => state.auth.token);
  const userInitialValues = useSelector((state) => state.auth);

  const initialFormState = {
    //update here
    inputValues: {
      userDisplayName: userInitialValues.displayName
        ? userInitialValues.displayName
        : "",
      userBriefInfo: "",
      userPhoneNumber: "",
      userFacebook: "",
      userTwitter: "",
      userHomeAddress: "",
      userAge: "",
    },
    inputValidities: {
      userDisplayName: true,
      userBriefInfo: true,
      userPhoneNumber: true,
      userFacebook: true,
      userTwitter: true,
      userHomeAddress: true,
      userAge: true,
    },
    formIsValid: true,
  };

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialFormState
  );

  const inputChangeHandler = useCallback(
    // passing args from Input components
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const handleFormSubmit = async () => {
    // console.log(userTokenId);
    let action;
    const userDisplayName = formState.inputValues.userDisplayName;
    setErrorText(null);
    setIsLoading(true);
    console.log(userDisplayName);
    action = authActions.updateProfile(userDisplayName, userTokenId);
    try {
      await dispatch(action);
      Alert.alert(
        "Done!",
        "Display Name changed successfully! Re-login to see changes!",
        [{ text: "Okay" }]
      );
      // navigation.push("afterLogin", { fromLogin: "hello from LoginScreen" });
    } catch (err) {
      console.log(err.message);
      setErrorText(err.message);
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Settings",
      // headerRight: () => (
      //   <MyHeaderIcon
      //     iconName="ios-home"
      //     style={{ marginLeft: 0 }}
      //     onPress={() => {
      //       console.log("pressed");
      //     }}
      //   />
      // ),
    });
    console.log(formState.inputValues);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleFont}>Edit your personal profile</Text>
      <View style={styles.formContainer}>
        <ScrollView style={styles.formContainerInside}>
          <InputBox
            altStyle={true}
            id="userDisplayName"
            label="Display First and Last Name"
            errorText="Please enter a valid name!"
            keyboardType="default"
            returnKeyType="done"
            autoCapitalize="words"
            onInputChange={inputChangeHandler}
            onSubmitEditing={() => {}}
            placeholder={formState.inputValues.userDisplayName}
          />
          <InputBox
            altStyle={true}
            id="userBriefInfo"
            label="Brief Info"
            errorText="Please enter a valid brief info!"
            keyboardType="default"
            returnKeyType="done"
            autoCapitalize="words"
            onInputChange={inputChangeHandler}
            onSubmitEditing={() => {}}
            placeholder={formState.inputValues.userBriefInfo}
          />
          <InputBox
            altStyle={true}
            id="userPhoneNumber"
            label="Phone Number"
            errorText="Please enter a valid phone number!"
            keyboardType="default"
            returnKeyType="done"
            autoCapitalize="words"
            onInputChange={inputChangeHandler}
            onSubmitEditing={() => {}}
            placeholder={formState.inputValues.userPhoneNumber}
          />
          <InputBox
            altStyle={true}
            id="userFacebook"
            label="Facebook"
            errorText="Please enter a valid FB!"
            keyboardType="default"
            returnKeyType="done"
            autoCapitalize="words"
            onInputChange={inputChangeHandler}
            onSubmitEditing={() => {}}
            placeholder={formState.inputValues.userFacebook}
          />
          <InputBox
            altStyle={true}
            id="userTwitter"
            label="Twitter"
            errorText="Please enter a valid twitter id!"
            keyboardType="default"
            returnKeyType="done"
            autoCapitalize="words"
            onInputChange={inputChangeHandler}
            onSubmitEditing={() => {}}
            placeholder={formState.inputValues.userTwitter}
          />
          <InputBox
            altStyle={true}
            id="userHomeAddress"
            label="Home Address"
            errorText="Please enter a valid home address!"
            keyboardType="default"
            returnKeyType="done"
            autoCapitalize="words"
            onInputChange={inputChangeHandler}
            onSubmitEditing={() => {}}
            placeholder={formState.inputValues.userHomeAddress}
          />
          <InputBox
            altStyle={true}
            id="userAge"
            label="Age"
            errorText="Please enter age!"
            keyboardType="default"
            returnKeyType="done"
            autoCapitalize="words"
            onInputChange={inputChangeHandler}
            onSubmitEditing={() => {}}
            placeholder={formState.inputValues.userAge}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleFormSubmit}
        >
          <Text style={styles.buttonTextStyle}>Submit Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  formContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    height: 600,
    marginVertical: 30,
    padding: 10,
    backgroundColor: '#C0C0C0',
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  formContainerInside: {
    width: "90%",
  },
  titleFont: {
    fontFamily: Fonts.primaryFont,
    fontSize: 25,
    fontWeight: "bold",
  },
  listContainer: {
    width: "100%",
    height: 30,
    paddingVertical: 20,
  },
  homeCard: {
    alignItems: "center",
    marginBottom: 10,
    width: "70%",
    height: 150,
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.accentColor,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    justifyContent: "center",
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
  },
  buttonTextStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SettingsScreen;
