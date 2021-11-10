export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const GET_USER = "GET_USER";
export const LOGGED_OUT = "LOGGED_OUT";

export const createNewUser = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: CREATE_NEW_USER, userObject: { userId: userId } });

    const myUserId = getState().auth.userId;
    const myUserObj = getState().user.currentLoggedInUser;
    // console.log(myUserObj);
    const response = await fetch(
      `https://rn-battery-app-default-rtdb.asia-southeast1.firebasedatabase.app/userInfo.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myUserObj),
      }
    );

    if (!response.ok) {
      throw new Error("Can't create user... Please try again...");
    }

    const resData = await response.json();
  };
};

export const getUser = (userId) => {
  return async (dispatch, getState) => {
    const myUserId = getState().auth.userId;
    // console.log(myUserObj);
    const response = await fetch(
      `https://rn-battery-app-default-rtdb.asia-southeast1.firebasedatabase.app/userInfo.json`
    );

    if (!response.ok) {
      throw new Error("Can't fetch user... Please try again...");
    }

    const resData = await response.json();
    const newUserState = [];

    dispatch({ type: GET_USER, userObject: { userId: userId } });
  };
};

export const logUserOut = (userId) => {
  return { type: LOGGED_OUT };
};
