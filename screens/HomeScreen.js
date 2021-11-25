import React, { useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import MyHeaderIcon from "../components/MyHeaderIcon";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import DummyItem from "../components/DummyItem";
import Card from "../components/Card";

const dummyItem = ["hello"];

const HomeScreen = (props) => {
  // console.log(props.route.params) //testing passing parameters across
  const { params } = props.route.params; //from login screen into homescreen
  // console.log(params) // now working!

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
      {/* <ScrollView contentContainerStyle={styles.listContainer}>
        <TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            {dummyItem.map((item) => (
              <Card style={styles.homeCard} key={item}>
                <DummyItem innerText={item} />
              </Card>
            ))}
          </View>
        </TouchableOpacity>
      </ScrollView> */}
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
  userImageContainer: {
    marginVertical: 10,
    width: "90%",
    height: "20%",
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
  },
  listContainer: {
    width: "100%",
    height: 30,
    paddingVertical: 20,
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
