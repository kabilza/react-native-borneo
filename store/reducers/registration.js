import { ADD_NEW_BATTERY, REMOVE_BATTERY } from "../actions/registration";
import BatteryRegistration from "../../models/batteryRegistration";

const initialState = {
  prevRegistration: [
    new BatteryRegistration(
      "u1",
      "barcode1",
      "brand1",
      "type1",
      "warrantyPeriod1",
      "dateInstalled1",
      "model1",
      "shopName1",
      "shopProvince1",
      "shopDistrict1",
      "shopPhoneNumber1",
      "001"
    ),
    new BatteryRegistration(
      "u2",
      "barcode2",
      "brand2",
      "type2",
      "warrantyPeriod2",
      "dateInstalled2",
      "model2",
      "shopName2",
      "shopProvince2",
      "shopDistrict2",
      "shopPhoneNumber2",
      "002"
    ),
    new BatteryRegistration(
        "u3",
        "barcode3",
        "brand3",
        "type3",
        "warrantyPeriod3",
        "dateInstalled3",
        "model3",
        "shopName3",
        "shopProvince3",
        "shopDistrict3",
        "shopPhoneNumber3",
        "003"
      ),
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_BATTERY:
      let newState;
      const dateInstalled = action.battery.dateInstalled;
      const model = action.battery.model;
      const newBattery = new BatteryRegistration(
        "u5",
        dateInstalled,
        model,
        "05"
      );
      newState = {
        ...state,
        prevRegistration: [...state.prevRegistration, newBattery],
      };
      return newState;
    case REMOVE_BATTERY:
      return "";
  }
  return state;
};
