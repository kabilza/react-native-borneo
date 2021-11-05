import React from "react";
import { useState, createRef } from "react";
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
} from "react-native";
import { useDispatch } from "react-redux";

import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

import * as authActions from "../store/actions/auth";

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formValid, setFormIsValid] = useState(false);
  // const [formValidStatus, setFormValidStatus] = useState({
  //   userName: false,
  //   password: false,
  // });
  const [errortext, setErrortext] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();

  const passwordInputRef = createRef();

  const formModeSwitch = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const formChangeHandler = () => {
    setFormIsValid(true);
    if (userEmail === "") {
      Alert.alert("Please enter Email!", "Email cannot be blank!", [
        { text: "Okay" },
      ]);
      setFormIsValid(false);
    }
    if (userPassword === "") {
      Alert.alert("Please enter Password!", "Password cannot be blank!", [
        { text: "Okay" },
      ]);
      setFormIsValid(false);
    }
  };

  const handleFormSubmit = () => {
    if (formValid) {
      console.log("form is valid");
      if (!isSignUp) {
        console.log("login");
        console.log({ userEmail, userPassword });
        dispatch(authActions.login(userEmail, userPassword));
      } else {
        console.log("sign up");
        console.log({ userEmail, userPassword });
        dispatch(authActions.signup(userEmail, userPassword));
      }
    } else {
      console.log("form is not valid!");
      Alert.alert("Forms is not valid!", "Please make sure the form(s) are valid and is not empty!", [
        { text: "Okay" },
      ]);
    }
  };

  // const dispatchFormFunc = () => {
  //   if (formValid) {
  //     if (!isSignUp) {
  //       console.log("sign in");
  //       console.log({ userEmail, userPassword });
  //       // dispatch(authActions.signup(userEmail, userPassword));
  //     } else {
  //       console.log("sign up");
  //       console.log({ userEmail, userPassword });
  //       // dispatch(authActions.signup(userEmail, userPassword));
  //     }
  //   }
  // }

  const jumpToHome = () => {
    navigation.push("afterLogin", { fromLogin: "hello from LoginScreen" });
  };

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
              }}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Text>
            <View>
              <TextInput
                style={styles.textInputEmail}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current && passwordInputRef.current.focus();
                }}
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.textInputEmail}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                // onSubmitEditing={Keyboard.dismiss}
                onSubmitEditing={() => {
                  formChangeHandler();
                  Keyboard.dismiss();
                }}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleFormSubmit}
              >
                <Text style={styles.buttonTextStyle}>
                  {isSignUp ? "Sign Up" : "Login"}
                </Text>
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
    height: 350,
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
