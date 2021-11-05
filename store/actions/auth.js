export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGsIoV4XajZlYThhBxX6oPsKtyqn8Wr3c",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);


    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

  };
};

export const login = (email, password) => {
    return async (dispatch) => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGsIoV4XajZlYThhBxX6oPsKtyqn8Wr3c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
  
      const resData = await response.json();
      console.log(resData);
  
      if (!response.ok) {
          throw new Error('Something went wrong!');
      }
  
    };
  };
  