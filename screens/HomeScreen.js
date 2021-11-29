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
  // const authUserProfile = useSelector((state) => state.auth.userProfile);
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
          source={require("../assets/images/defaultUserIcon.png")}
        >
          <View style={styles.userImageContainer}>
            <Image
              style={styles.userImage}
              source={require("../assets/images/defaultUserIcon.png")}
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
            <Text style={styles.titleFont2}>User location!</Text>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <UserInformation
          title="Brief Info"
          data="Some Info"
          iconName="ios-people"
        ></UserInformation>
        <UserInformation
          title="Brief Info"
          data="Some Info"
          iconName="ios-people"
        ></UserInformation>
      </ScrollView>
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
    flex: 1,
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
    color: "#A5A5A5",
  },
  titleFont2: {
    fontFamily: Fonts.primaryFont,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    color: "#A5A5A5",
  },
  listContainer: {
    width:"90%",
    height: 30,
    // paddingVertical: 20,
    flex: 1,
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
