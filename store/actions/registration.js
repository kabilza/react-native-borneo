export const ADD_NEW_BATTERY = "ADD_NEW_BATTERY";
export const REMOVE_BATTERY = "REMOVE_BATTERY";
export const SET_REGIS = "SET_REGIS";
import BatteryRegistration from "../../models/batteryRegistration";

export const fetchRegistration = () => {
  return async (dispatch, getState) => {
    try {
      const myUserId = getState().auth.userId;
      const response = await fetch(
        `http://localhost:3001/battery/fetchBattery?userId=${myUserId}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log(resData);
      const loadedRegistration = [];

      for (const key in resData) {
        loadedRegistration.push(
          new BatteryRegistration(
            resData[key].userId,
            resData[key].barcode,
            resData[key].brand,
            resData[key].type,
            resData[key].warrantyPeriod,
            resData[key].dateInstalled,
            resData[key].model,
            resData[key].shopName,
            resData[key].shopProvince,
            resData[key].shopDistrict,
            resData[key].shopPhoneNumber,
            resData[key]._id
          )
        );
      }

      console.log(loadedRegistration);

      dispatch({ type: SET_REGIS, registration: loadedRegistration.filter(regis => {return regis.userId === myUserId})});
    } catch (err) {
      throw err;
    }
  };
};

export const addNewBattery = (battery) => {
  return async (dispatch, getState) => {
    const myToken = getState().auth.token;
    const myUserId = getState().auth.userId;
    const newInputValues = {userId: myUserId, ...battery.inputValues};

    const response = await fetch(
      `http://localhost:3001/battery/addNewBattery?auth=${myToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInputValues),
      }
    );

    if (!response.ok) {
      throw new Error("Please wait a little bit then submit again...");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_NEW_BATTERY,
      battery: battery.inputValues,
      id: resData.name,
      userId: myUserId
    });
  };
};

export const removeBattery = (batteryId) => {
  return async (dispatch, getState) => {
    const myToken = getState().auth.token;
    await fetch(
      `https://rn-battery-app-default-rtdb.asia-southeast1.firebasedatabase.app/batteryregistration/${batteryId}.json?auth=${myToken}`,
      { method: "DELETE" }
    );
    dispatch({
      type: REMOVE_BATTERY,
      batteryId: batteryId,
    });
  };
};
