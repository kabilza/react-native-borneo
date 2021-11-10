import { CREATE_NEW_USER, GET_USER, LOGGED_OUT } from "../actions/user";
import UserProfile from "../../models/userProfile";

const initialState = {
    currentLoggedInUser: []
//   currentLoggedInUser: new UserProfile(
//     (userId = "userId"),
//     (name = "name"),
//     (age = "age"),
//     (homeAddress = "homeAddress"),
//     (phoneNumber = "phoneNumber"),
//     (facebook = "facebook"),
//     (line = "line")
//   ),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_USER:
      const newUser = new UserProfile(
        (userId = action.userObject.userId),
        (name = "name"),
        (age = "age"),
        (homeAddress = "homeAddress"),
        (phoneNumber = "phoneNumber"),
        (facebook = "facebook"),
        (line = "line"),
        (profileImageUrl = "profileImageUrl")
      );
      return { ...state, currentLoggedInUser: [newUser] };
    case GET_USER:
        const userIdToCheck = action.userId;
      return {};
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
};
