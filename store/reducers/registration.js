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
            return ''
        case REMOVE_BATTERY:
            return ''
    }
    return state;
};