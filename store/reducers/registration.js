import { ADD_NEW_BATTERY, REMOVE_BATTERY } from "../actions/registration";
import BatteryRegistration from "../../models/batteryRegistration";

const initialState = {
    prevRegistration: [new BatteryRegistration('u1', '12/02/21', 'm1', '01'),
    new BatteryRegistration('u2', '13/02/21', 'm2', '02'),
    new BatteryRegistration('u3', '14/02/21', 'm3', '03'),
    new BatteryRegistration('u4', '15/02/21', 'm4', '04')]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_BATTERY:
            let newState;
            const dateInstalled = action.battery.dateInstalled;
            const model = action.battery.model;
            const newBattery = new BatteryRegistration('u5', dateInstalled, model, '05');
            newState = {...state, prevRegistration: [...state.prevRegistration, newBattery]}
            return newState;
        case REMOVE_BATTERY:
            return ''
    }
    return state;
};