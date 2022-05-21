import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { NameScreen } from "./NameScreen";
import { DOBScreen } from "./DOBScreen";
import { PhoneNoScreen } from "./PhoneNoScreen";
import { useAuth } from "../../lib/hooks";

export function SignInScreen() {
  const [state, setState] = useState({
    step: 0,
    name: "",
    dob: "",
    phoneNumber: "",
  });

  const auth = useAuth();

  const handleChange = (e) => {
    if (state.step == 0) {
      setState((prevState) => ({
        ...prevState,
        name: e,
      }));
    }
    if (state.step == 1) {
      setState((prevState) => ({
        ...prevState,
        dob: e,
      }));
    }
    if (state.step == 2) {
      setState((prevState) => ({
        ...prevState,
        phoneNumber: e,
      }));
    }
  };

  const nextStep = () => {
    let currentStep = state.step;
    currentStep = currentStep >= 1 ? 2 : currentStep + 1;

    setState((prevState) => ({
      ...prevState,
      step: currentStep,
    }));
  };

  const prevStep = () => {
    let currentStep = state.step;
    currentStep = currentStep <= 0 ? 0 : currentStep - 1;

    setState((prevState) => ({
      ...prevState,
      step: currentStep,
    }));
  };

  const NextButton = () => {
    if (state.step < 2) {
      return (
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text>Next</Text>
        </TouchableOpacity>
      );
    } else if (state.step == 2) {
      return (
        <TouchableOpacity style={styles.button} onPress={() => auth.signinWithGoogle()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  const PrevButton = () => {
    if (state.step !== 0) {
      return (
        <TouchableOpacity style={styles.button} onPress={prevStep}>
          <Text>Prev</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  console.log(state);

  return (
    <View style={styles.container}>
      <NameScreen
        currentStep={state.step}
        styles={styles}
        handleChange={handleChange}
      />
      <DOBScreen
        currentStep={state.step}
        styles={styles}
        handleChange={handleChange}
      />
      <PhoneNoScreen
        currentStep={state.step}
        styles={styles}
        handleChange={handleChange}
      />
      <View style={styles.buttonContainer}>
        <PrevButton />
        <NextButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: 300,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginRight: 10,
  },
  input: {
    height: 75,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

// export function SignInScreen() {
//   const auth = useAuth();
//   return <Button title="signin" onPress={() => auth.signinWithGoogle()} />;
// }
