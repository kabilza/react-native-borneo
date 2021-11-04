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
  const [errortext, setErrortext] = useState("");

  const dispatch = useDispatch();

  const passwordInputRef = createRef();

  const handleFormSubmit = () => {
    console.log({ userEmail, userPassword });
    // dispatch(authActions.signup(email, password));
  };

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
                marginBottom: 30,
                color: "white",
              }}
            >
              Login
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
                onChangeText={(text) => {
                  setUserEmail(text);
                }}
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
                onChangeText={(text) => {
                  setUserPassword(text);
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
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
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
    height: 250,
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
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
