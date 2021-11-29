import React, { useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import MyHeaderIcon from "../components/MyHeaderIcon";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import UserInformation from "../components/UserInformation";

const dummyItem = ["hello"];

const HomeScreen = (props) => {
  // console.log(props.route.params) //testing passing parameters across
  const { params } = props.route.params; //from login screen into homescreen
  // console.log(params) // now working!
  const authUserProfile = useSelector((state) => state.auth.userProfile);
  // console.log(authUserProfile);
  const displayName = useSelector((state) => state.auth.displayName);
  // console.log(displayName);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Home",
      headerRight: () => (
        <MyHeaderIcon
          iconName="ios-create"
          style={{ marginLeft: -40 }}
          onPress={() => {
            console.log("pressed");
            props.navigation.navigate("LinkToRegistrationStack", {
              fromHome: true,
            });
          }}
        />
      ),
    });
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={20}
          // source={{ uri: avatarBackground }}
          source={require("../assets/images/defaultProfile.jpeg")}
        >
          <View style={styles.userImageContainer}>
            <Image
              style={styles.userImage}
              source={require("../assets/images/defaultProfile.jpeg")}
              resizeMode="contain"
            />
            {displayName ? (
              <Text style={styles.titleFont}>Welcome, {displayName}!</Text>
            ) : (
              <Text style={styles.titleFont}>Welcome, user!</Text>
            )}
          </View>
          <View style={styles.userLocationSection}>
            <Ionicons name="ios-flag" size={24} color="white" />
            <Text style={styles.titleFont2}>{authUserProfile.homeAddress}</Text>
          </View>
        </ImageBackground>
      </View>

      <SafeAreaView style={{flex: 1, height: 10}}>
        <ScrollView
          contentContainerStyle={styles.listContainer}
        >
          <UserInformation
            title="Brief Info"
            data={authUserProfile.briefInfo}
            iconName="ios-information-circle"
          ></UserInformation>
          <UserInformation
            title="Phone Number"
            data={authUserProfile.phoneNumber}
            iconName="ios-call"
          ></UserInformation>
          <UserInformation
            title="Facebook"
            data={authUserProfile.facebook}
            iconName="ios-logo-facebook"
          ></UserInformation>
          <UserInformation
            title="Twitter"
            data={authUserProfile.twitter}
            iconName="ios-logo-twitter"
          ></UserInformation>
          <UserInformation
            title="Home Address"
            data={authUserProfile.homeAddress}
            iconName="ios-home"
          ></UserInformation>
          <UserInformation
            title="Age"
            data={authUserProfile.age}
            iconName="ios-people"
          ></UserInformation>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  userLocationSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginHorizontal: 5,
    // backgroundColor: 'grey',
    width: "100%",
  },
  infoContainer: {
    flex: 3,
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
  },
  headerContainer: {
    height: "35%",
    width: "100%",
    marginTop: -15,
    marginLeft: 0,
    marginRight: 0,
    borderBottomColor: "#A5A5A5",
    borderBottomWidth: 1,
    
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
    flex: 1,
  },
  userImageContainer: {
    alignItems: "center",
  },
  userImage: {
    height: 90,
    width: 90,
    backgroundColor: "grey",
    borderRadius: 50,
  },
  titleFont: {
    fontFamily: Fonts.primaryFont,
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  titleFont2: {
    fontFamily: Fonts.primaryFont,
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 20,
    color: "white",
  },
  listContainer: {
    width: "100%",
    height: 500,
    paddingHorizontal: 20,
  },
  homeCard: {
    alignItems: "center",
    marginBottom: 10,
    width: 200,
    height: 150,
    justifyContent: "center",
    backgroundColor: "#888",
  },
});

export default HomeScreen;
