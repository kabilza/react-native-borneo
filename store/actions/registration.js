export const ADD_NEW_BATTERY = "ADD_NEW_BATTERY";
export const REMOVE_BATTERY = "REMOVE_BATTERY";
export const SET_REGIS = "SET_REGIS";
import BatteryRegistration from "../../models/batteryRegistration";

export const fetchRegistration = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-battery-app-default-rtdb.asia-southeast1.firebasedatabase.app/batteryregistration.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedRegistration = [];

      for (const key in resData) {
        loadedRegistration.push(
          new BatteryRegistration(
            "u1",
            resData[key].batteryBarcode,
            resData[key].batteryBrand,
            resData[key].batteryType,
            resData[key].dateInstalled,
            resData[key].model,
            resData[key].shopDistrict,
            resData[key].shopName,
            resData[key].shopPhoneNumber,
            resData[key].shopProvince,
            resData[key].warrantyPeriod,
            key
          )
        );
      }

      dispatch({ type: SET_REGIS, registration: loadedRegistration });
    } catch (err) {
      throw err;
    }
  };
};

export const addNewBattery = (battery) => {
  return async (dispatch) => {
    const { inputValues } = battery;

    const response = await fetch(
      "https://rn-battery-app-default-rtdb.asia-southeast1.firebasedatabase.app/batteryregistration.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_NEW_BATTERY,
      battery: battery.inputValues,
      id: resData.name,
    });
  };
};

export const removeBattery = (batteryId) => {
  return async (dispatch) => {
    await fetch(
      `https://rn-battery-app-default-rtdb.asia-southeast1.firebasedatabase.app/batteryregistration/${batteryId}.json`,
      { method: "DELETE" }
    );
    dispatch({
      type: REMOVE_BATTERY,
      batteryId: batteryId,
    });
  };
};
