import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Loader loading={false} />
      <Text style={{fontFamily: Fonts.primaryFont, fontSize: 25, fontWeight: 'bold'}}>This is a login screen!</Text>
      <View style={styles.inputBoxesContainer}>
        <TextInput style={styles.textInputEmail} placeholder="Email" />
        <TextInput style={styles.textInputEmail} placeholder="Password" />
      </View>
    </View>
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
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    width: 300,
    height: 30,
    marginVertical: 10,
  },
  inputBoxesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    height: 150,
    marginVertical: 30,
    padding: 30,
    backgroundColor: Colors.accentColor,
    borderRadius: 15
  },
});

export default LoginScreen;
