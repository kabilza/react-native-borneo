import React, { useReducer, useEffect, forwardRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const initialState = {
  value: "",
  isValid: false,
  touched: false,
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      // console.log("prev state" + action.value);
      // console.log("input is changing " + action.value);
      return { ...state, value: action.value, isValid: action.isValid };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const InputBox = forwardRef((props, ref) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid); //firing to parent comp screen
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    let isValid = true;
    if (text == "") {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={props.altStyle ? styles.input2 : styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        ref={ref}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  input2: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: 'white',
    marginBottom: 15
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
});

export default InputBox;
