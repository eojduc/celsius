import { useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { NameScreen } from "./NameScreen";
import { DOBScreen } from "./DOBScreen";
import { PhoneNoScreen } from "./PhoneNoScreen";
import { PhoneNoVerifScreen } from "./PhoneNoVerifScreen";
import { useAuth } from "../../lib/hooks";
import { app } from "../../lib/firebase";

export function SignInScreen() {
  const [state, setState] = useState({
    step: 0,
    name: "",
    dob: "",
    phoneNumber: "",
    verificationId: "",
    verificationCode: "",
  });
  const recaptchaVerifier = useRef(null);
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
    if (state.step == 3) {
      setState((prevState) => ({
        ...prevState,
        verificationCode: e,
      }));
    }
  };

  const nextStep = () => {
    let currentStep = state.step;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;

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
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              auth
                .sendVerificationCode(state.phoneNumber, recaptchaVerifier)
                .then((res) => {
                  setState((prevState) => ({
                    ...prevState,
                    verificationId: res,
                  }));
                });
              nextStep();
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Text>Send Verification Code</Text>
        </TouchableOpacity>
      );
    } else if (state.step == 3) {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            auth.signinWithPhone(state.verificationId, state.verificationCode)
          }
        >
          <Text>Confirm Code</Text>
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

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        // attemptInvisibleVerification
      />
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
      <PhoneNoVerifScreen
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
    fontSize: 24,
  },
});
