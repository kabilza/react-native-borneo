import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyHeaderIcon from "../components/MyHeaderIcon";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import DummyItem from "../components/DummyItem";
import Card from "../components/Card";

const dummyItem = ["hello", "this", "is", "test"];

const HomeScreen = ( props ) => { 
  // console.log(props.route.params) //testing passing parameters across
  const { params } = props.route.params //from login screen into homescreen
  // console.log(params) // now working!
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "You are in HomeScreen!",
      headerRight: () => (
        <MyHeaderIcon
          iconName="md-home"
          style={{ marginLeft: -40 }}
          onPress={() => {
            console.log("pressed");
          }}
        />
      ),
    });
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleFont}>This is homescreen!</Text>
      <Text style={styles.titleFont}> {params.fromLogin} </Text>
      <ScrollView style={styles.listContainer}>
        <View style={{alignItems: 'center'}}>
          {dummyItem.map((item) => (
            <Card style={styles.homeCard} key={item}>
              <DummyItem innerText={item}/>
            </Card>
          ))}
        </View>
      </ScrollView>
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
    justifyContent: 'center'
  },
});

export default HomeScreen;
