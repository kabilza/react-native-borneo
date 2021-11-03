import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../../components/Card";
import BatteryItem from "../../components/BatteryItem";
import TitleText from "../../components/TitleText";
import MyHeaderIcon from "../../components/MyHeaderIcon";
import * as batteryRegistrationAction from "../../store/actions/registration";
import { Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";

const RegistrationListScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const previouslyRegisteredBattery = useSelector(
    (state) => state.registration.prevRegistration
  );

  const loadRegis = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(batteryRegistrationAction.fetchRegistration());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useLayoutEffect(() => {
    // console.log(props);
    props.navigation.setOptions({
      headerTitle: "Previously Registered List",
      headerLeft: () => (
        <MyHeaderIcon
          iconName="ios-menu"
          style={{ marginLeft: -10 }}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      ),
      headerRight: () => (
        <MyHeaderIcon
          iconName="ios-create"
          style={{ marginRight: -4, marginBottom: 1 }}
          onPress={() => {
            props.navigation.push("RegistrationAddEdit");
          }}
        />
      ),
    });
  }, [props.navigation]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("focus", loadRegis);
    return () => {
      willFocusSub;
    };
  }, [loadRegis]);

  useEffect(() => {
    loadRegis();
  }, [dispatch, loadRegis]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadRegis}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (!isLoading && previouslyRegisteredBattery.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No previous registration found.</Text>
        <Text>Start adding some by tapping top right button!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TitleText>Registered Battery</TitleText>
      <FlatList
        data={previouslyRegisteredBattery}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => (
          <BatteryItem
            barcode={itemData.item.barcode}
            brand={itemData.item.brand}
            model={itemData.item.model}
            type={itemData.item.type}
            warrantyPeriod={itemData.item.warrantyPeriod}
            dateInstalled={itemData.item.dateInstalled}
            shopName={itemData.item.shopName}
            shopProvince={itemData.item.shopProvince}
            shopDistrict={itemData.item.shopDistrict}
            shopPhoneNumber={itemData.item.shopPhoneNumber}
            batteryId={itemData.item.id}
            onSelect={() => {
              props.navigation.navigate("BatteryDetailScreen", {
                itemId: itemData.item.id,
              });
            }}
          />
        )}
      />
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegistrationListScreen;
