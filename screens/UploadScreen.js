import React, { useState, useLayoutEffect, useEffect } from "react";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";

import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

import * as authActions from "../store/actions/auth"

const UploadScreen = (props) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector(state => state.auth);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Upload your picture",
      //   headerRight: () => (
      //     <MyHeaderIcon
      //       iconName="ios-create"
      //       style={{ marginLeft: -40 }}
      //       onPress={() => {
      //         console.log("pressed");
      //         props.navigation.navigate("LinkToRegistrationStack", {
      //           fromHome: true,
      //         });
      //       }}
      //     />
      //   ),
    });
  }, [props.navigation]);

  //   const selectFile = async () => {
  //     const options = {
  //         mediaType: 'photo',
  //         quality: 0.5,

  //     }
  //     const result = await launchImageLibrary(options);
  //     try {
  //         console.log(result);
  //     } catch (err) {
  //         console.log('error')
  //         console.log(err);
  //     }
  //   }

  const selectFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const userTokenId = userAuthState.token;
      setImage(result.uri);
      dispatch(authActions.updateProfilePicture(result.uri, userTokenId))
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleFont}>Edit your personal profile</Text>
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}
        >
          <Text style={styles.buttonTextStyle}>Upload Picture</Text>
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
  titleFont: {
    fontFamily: Fonts.primaryFont,
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 15,
  },
  formContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    height: 600,
    marginBottom: 30,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#C0C0C0",
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

export default UploadScreen;
