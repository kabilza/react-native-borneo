import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useReducer,
  useCallback,
  createRef,
} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Text,
  Input,
  Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";

import * as batteryRegistrationAction from "../../store/actions/registration";
import BodyText from "../../components/BodyText";
import TitleText from "../../components/TitleText";
import InputBox from "../../components/InputBox";
import MyHeaderIcon from "../../components/MyHeaderIcon";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// declare reducer outside to prevent re-creation of the function
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    let newState = {};
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    newState = {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
    console.log(newState);
    return newState;
  }
  return state;
};

const RegistrationAddEdit = (props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const submitDateInput = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const simplifiedDate = currentDate.toISOString().split("T")[0];
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: simplifiedDate, //value from child
      isValid: true, //isValid from child
      input: "dateInstalled", //inputId from child comp
    });
  };

  const dateInstalledInput = createRef();
  const batteryBrandInput = createRef();
  const batteryModelInput = createRef();
  const batteryBarcodeInput = createRef();
  const batteryTypeInput = createRef();
  const warrantyPeriodInput = createRef();
  const shopNameInput = createRef();
  const shopProvinceInput = createRef();
  const shopDistrictInput = createRef();
  const shopPhoneNumberInput = createRef();
  const navigation = props.navigation;

  const dispatch = useDispatch();

  const initialFormState = {
    inputValues: {
      batteryBarcode: "",
      batteryBrand: "",
      batteryType: "",
      dateInstalled: "",
      model: "",
      shopDistrict: "",
      shopName: "",
      shopPhoneNumber: "",
      shopProvince: "",
      warrantyPeriod: "",
    },
    inputValidities: {
      batteryBarcode: false,
      batteryBrand: false,
      batteryType: false,
      dateInstalled: false,
      model: false,
      shopDistrict: false,
      shopName: false,
      shopPhoneNumber: false,
      shopProvince: false,
      warrantyPeriod: false,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialFormState
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Battery",
      headerRight: () => {
        return (
          <MyHeaderIcon
            iconName="ios-checkmark"
            style={{ marginRight: -4, marginBottom: 1 }}
            onPress={submitHandler}
          />
        );
      },
    });
  }, [navigation, formState, submitHandler]);

  const inputChangeHandler = useCallback(
    // passing args from Input components
    (inputIdentifier, inputValue, inputValidity) => {
      // console.log(inputIdentifier)
      console.log("input from child " + inputIdentifier + " " + inputValue);
      // console.log(inputValidity)
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    submitDateInput(date);
  }, []);

  const submitHandler = useCallback(async () => {
    if (formState.formIsValid == false) {
      Alert.alert("Invalid input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(batteryRegistrationAction.addNewBattery(formState));
      setIsLoading(false);
      Alert.alert("Form Received!", "Registration Success!", [
        { text: "Okay" },
      ]);
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
  }, [formState]);

  useEffect(() => {
    if (error) {
      Alert.alert("Something wrong!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <TitleText>Register your new Battery</TitleText>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          <View style={styles.form}>
            <View>
              <View>
                <Text>Date Installed: </Text>
              </View>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={submitDateInput}
              />
            </View>
            <InputBox
              id="batteryBrand"
              label="Battery Brand"
              errorText="Please enter a valid brand!"
              keyboardType="default"
              returnKeyType="next"
              ref={batteryBrandInput}
              autoCorrect={false}
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                batteryModelInput.current && batteryModelInput.current.focus()
              }
              required
            />
            <InputBox
              id="model"
              label="Battery Model"
              errorText="Please enter a valid model!"
              keyboardType="default"
              returnKeyType="next"
              ref={batteryModelInput}
              autoCorrect={false}
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                batteryBarcodeInput.current &&
                batteryBarcodeInput.current.focus()
              }
              required
            />
            <InputBox
              id="batteryBarcode"
              label="Battery Barcode"
              errorText="Please enter a valid barcode!"
              keyboardType="default"
              returnKeyType="next"
              autoCorrect={false}
              ref={batteryBarcodeInput}
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                batteryTypeInput.current && batteryTypeInput.current.focus()
              }
              required
            />
            <InputBox
              id="batteryType"
              label="Battery Type"
              errorText="Please enter a valid battery type!"
              keyboardType="default"
              returnKeyType="next"
              ref={batteryTypeInput}
              autoCorrect={false}
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                warrantyPeriodInput.current &&
                warrantyPeriodInput.current.focus()
              }
              required
            />
            <InputBox
              id="warrantyPeriod"
              label="Warranty Period"
              errorText="Please enter a valid period!"
              keyboardType="default"
              returnKeyType="next"
              ref={warrantyPeriodInput}
              autoCorrect={false}
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                shopNameInput.current && shopNameInput.current.focus()
              }
              required
            />
            <InputBox
              id="shopName"
              label="Shop Name"
              errorText="Please enter a valid shop name!"
              keyboardType="default"
              returnKeyType="next"
              ref={shopNameInput}
              autoCorrect={false}
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                shopProvinceInput.current && shopProvinceInput.current.focus()
              }
              required
            />
            <InputBox
              id="shopProvince"
              label="Shop Province"
              errorText="Please enter a valid province!"
              keyboardType="default"
              returnKeyType="next"
              ref={shopProvinceInput}
              autoCorrect={false}
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                shopDistrictInput.current && shopDistrictInput.current.focus()
              }
              required
            />
            <InputBox
              id="shopDistrict"
              label="Shop District"
              errorText="Please enter a valid shop district!"
              keyboardType="default"
              returnKeyType="next"
              ref={shopDistrictInput}
              autoCorrect={false}
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                shopPhoneNumberInput.current &&
                shopPhoneNumberInput.current.focus()
              }
              required
            />
            <InputBox
              id="shopPhoneNumber"
              label="Shop Phone Number"
              errorText="Please enter a valid number!"
              keyboardType="default"
              returnKeyType="done"
              autoCorrect={false}
              ref={shopPhoneNumberInput}
              onInputChange={inputChangeHandler}
              required
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  form: {
    margin: 20,
    width: "100%",
    width: 300,
  },
});

export default RegistrationAddEdit;
