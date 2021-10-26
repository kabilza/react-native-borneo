import { ADD_NEW_BATTERY, REMOVE_BATTERY } from "../actions/registration";

const initialState = {
    registration: {}
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