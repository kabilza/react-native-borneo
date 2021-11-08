import React from "react";
import { useState, createRef, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import LoginInputBox from "../components/LoginInputBox";

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
    return newState;
  }
  return state;
};

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormIsValid] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if(errorText){
      Alert.alert('An error occurred!', errorText, [{text: 'Okay'}]);
    }
  }, [errorText])

  const dispatch = useDispatch();

  const initialFormState = {
    inputValues: {
      userEmail: "",
      userPassword: "",
    },
    inputValidities: {
      userEmail: false,
      userPassword: false,
    },
    formIsValid: false,
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

  const passwordInputRef = createRef();

  const formModeSwitch = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const handleFormSubmit = async () => {
    let action;
    if (formState.formIsValid == false) {
      Alert.alert("Invalid input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    console.log("form is valid");
    const userEmail = formState.inputValues.userEmail;
    const userPassword = formState.inputValues.userPassword;
    if (!isSignUp) {
      console.log("login");
      console.log({ userEmail, userPassword });
      action = authActions.login(userEmail, userPassword);
    } else {
      console.log("sign up");
      console.log({ userEmail, userPassword });
      action = authActions.signup(userEmail, userPassword);
    }
    setErrorText(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      navigation.push("afterLogin", { fromLogin: "hello from LoginScreen" });
    } catch (err) {
      console.log(err.message);
      setErrorText(err.message);
      setIsLoading(false);
    }
  };

  // const jumpToHome = () => {
  //   navigation.push("afterLogin", { fromLogin: "hello from LoginScreen" });
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: "90%", resizeMode: "contain", margin: 30 }}
        />
        <View>
          <Loader loading={false} />

          <View style={styles.inputBoxesContainer}>
            <Text
              style={{
                fontFamily: Fonts.primaryFont,
                fontSize: 25,
                fontWeight: "bold",
                color: "white",
                marginTop: -5,
                marginBottom: 30,
              }}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Text>
            <View>
              <LoginInputBox
                id="userEmail"
                label="Enter E-mail"
                errorText="Please enter a valid E-mail!"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                autoCorrect={false}
                onInputChange={inputChangeHandler}
                onSubmitEditing={() => {
                  passwordInputRef.current && passwordInputRef.current.focus();
                }}
                required
              />
              <LoginInputBox
                id="userPassword"
                label="Enter Password"
                errorText="Please enter a valid password!"
                secureTextEntry={true}
                keyboardType="default"
                returnKeyType="done"
                autoCapitalize="none"
                ref={passwordInputRef}
                onInputChange={inputChangeHandler}
                onSubmitEditing={() => {}}
                required
              />
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleFormSubmit}
              >
                {isLoading ? (
                  <View
                    style={{ marginTop: 10 }}
                  >
                    <ActivityIndicator size="small" color="black" />
                  </View>
                ) : (
                  <Text style={styles.buttonTextStyle}>
                    {isSignUp ? "Sign Up" : "Login"}
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={formModeSwitch}
              >
                <Text style={styles.buttonTextStyle}>
                  Switch to {isSignUp ? "Login" : "Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.baseBackground,
    width: "100%",
  },
  textInputEmail: {
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "white",
    width: 300,
    height: 30,
    marginVertical: 10,
  },
  inputBoxesContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    height: 375,
    marginVertical: 30,
    padding: 30,
    backgroundColor: Colors.boxes,
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
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
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
