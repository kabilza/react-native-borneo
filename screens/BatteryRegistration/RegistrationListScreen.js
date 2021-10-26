import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import Card from "../../components/Card";
import DummyItem from "../../components/DummyItem";

const RegistrationListScreen = (props) => {
  const dummyItem = ["item1", "item2"];

  return (
    <View style={styles.container}>
      <Text>Previously Registered Battery</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        <TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            {dummyItem.map((item) => (
              <Card style={styles.homeCard} key={item}>
                <DummyItem innerText={item} />
              </Card>
            ))}
          </View>
        </TouchableOpacity>
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
    padding: 15,
  },
  listContainer: {
    width: "100%",
    height: 30,
    padding: 20,
  },
  homeCard: {
    alignItems: "center",
    marginBottom: 10,
    width: "70%",
    height: 150,
    justifyContent: "center",
  },
});

export default RegistrationListScreen;
