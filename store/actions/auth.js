import AsyncStorage from "@react-native-async-storage/async-storage";
// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

const saveDataToStorage = (token, userId, expirationDate, displayName) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
      displayName: displayName
    })
  );
};

export const logout = () => {
  return { type: LOGOUT };
};

export const authenticate = (userId, token, displayName) => {
  return { type: AUTHENTICATE, userId: userId, token: token, displayName: displayName };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "http://localhost:3001/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      // const errorResData = await response.json();
      // const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      // if (errorId === "EMAIL_EXISTS") {
      //   message = "This email exists already!";
      // }
      throw new Error(message);
      console.log('error!')
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken, resData.displayName));
    const expirationDate = new Date(
      new Date().getTime() + parseInt('3600') * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate, resData.displayName);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "http://localhost:3001/user/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      console.log('error!')
      const errorResData = await response.json();
      let message = errorResData.message;
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken, resData.displayName));
    const expirationDate = new Date(
      new Date().getTime() + parseInt('3600') * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate, resData.displayName);
  };
};

export const updateProfile = (userDisplayName, userTokenId) => {
  return async (dispatch, getState) => {
    const myUserId = getState().auth.userId;
    console.log(myUserId);
    // const myToken = getState().auth.token;
    const response = await fetch(
      `http://localhost:3001/user/profile/changeProfile?auth=${userTokenId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: myUserId,
          displayName: userDisplayName,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Error!')
    }

    const resData = await response.json();
    console.log(resData);
  };
};
