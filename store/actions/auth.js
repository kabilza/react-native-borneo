import AsyncStorage from "@react-native-async-storage/async-storage";
// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

const saveDataToStorage = (
  token,
  userId,
  expirationDate,
  displayName,
  briefInfo,
  phoneNumber,
  facebook,
  twitter,
  homeAddress,
  age,
  profileImage
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
      displayName: displayName,
      briefInfo: briefInfo,
      phoneNumber: phoneNumber,
      facebook: facebook,
      twitter: twitter,
      homeAddress: homeAddress,
      age: age,
      profileImage: profileImage,
    })
  );
};

export const logout = () => {
  return { type: LOGOUT };
};

export const authenticate = (userId, token, displayName, userProfile) => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token,
    displayName: displayName,
    userProfile: userProfile,
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      // const errorResData = await response.json();
      // const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      // if (errorId === "EMAIL_EXISTS") {
      //   message = "This email exists already!";
      // }
      throw new Error(message);
      console.log("error!");
    }

    const resData = await response.json();
    // console.log(resData);
    const userProfile = {
      briefInfo: resData.briefInfo,
      phoneNumber: resData.phoneNumber,
      facebook: resData.facebook,
      twitter: resData.twitter,
      homeAddress: resData.homeAddress,
      age: resData.age,
      profileImage: resData.profileImage,
    };
    // console.log(userProfile);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        resData.displayName,
        userProfile
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt("3600") * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      expirationDate,
      resData.displayName,
      resData.briefInfo,
      resData.phoneNumber,
      resData.facebook,
      resData.twitter,
      resData.homeAddress,
      resData.age,
      resData.profileImage
    );
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      console.log("error!");
      const errorResData = await response.json();
      let message = errorResData.message;
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);
    const userProfile = {
      briefInfo: resData.briefInfo,
      phoneNumber: resData.phoneNumber,
      facebook: resData.facebook,
      twitter: resData.twitter,
      homeAddress: resData.homeAddress,
      age: resData.age,
      profileImage: resData.profileImage,
    };
    // console.log(userProfile);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        resData.displayName,
        userProfile
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt("3600") * 1000
    );
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      expirationDate,
      resData.displayName,
      resData.briefInfo,
      resData.phoneNumber,
      resData.facebook,
      resData.twitter,
      resData.homeAddress,
      resData.age,
      resData.profileImage
    );
  };
};

export const updateProfile = (newProfile, userTokenId) => {
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
          newProfile: newProfile,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error!");
    }

    const resData = await response.json();
    console.log(resData);
  };
};

export const updateProfilePicture = (newProfileUri, userTokenId) => {
  return async (dispatch, getState) => {
    const myUserId = getState().auth.userId;
    // console.log(myUserId);
    // const myToken = getState().auth.token;
    const newFilename =
      new Date().toISOString() + "-" + newProfileUri.split("/").pop();
    let formData = new FormData();
    formData.append("photoData", {
      uri: newProfileUri,
      name: newFilename,
      type: "image",
    });
    const response = await fetch(
      `http://localhost:3001/user/profile/changeProfilePicture?auth=${userTokenId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // body: JSON.stringify({
        //   userId: myUserId,
        //   photoData: {
        //     uri: newProfileUri,
        //     name: newFilename,
        //     type: "image",
        //   },
        // }),
        body: {
          "hello": "hello"
        }
      }
    );

    if (!response.ok) {
      throw new Error("Error!");
    }

    const resData = await response.json();
    console.log(resData);
    // console.log(userTokenId);
    console.log("Update Profile!");
  };
};
