export const ADD_NEW_BATTERY = 'ADD_NEW_BATTERY'
export const REMOVE_BATTERY = 'REMOVE_BATTERY'

export const addNewBattery = battery => {
    return {
        type: ADD_NEW_BATTERY, battery: battery.inputValues
    };
};

export const removeBattery = batteryId => {
    return {
        type: REMOVE_BATTERY, batteryId: batteryId
    };
};