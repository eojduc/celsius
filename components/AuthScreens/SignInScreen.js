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
    formattedPhoneNo: "",
    verificationId: "",
    verificationCode: "",
  });
  const recaptchaVerifier = useRef(null);
  const [isValid, setIsValid] = useState(false);
  const auth = useAuth();

  const handleChange = (e) => {
    const val = e;
    const nameRe = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    if (state.step == 0) {
      if (val.length > 2 && val.length < 50 && nameRe.test(val)) {
        setState((prevState) => ({
          ...prevState,
          name: val,
        }));
        setIsValid(true);
      } else {
        setState((prevState) => ({
          ...prevState,
          name: "",
        }));
        setIsValid(false);
      }
    }
    if (state.step == 1) {
      setState((prevState) => ({
        ...prevState,
        dob: val,
      }));
      if (val.length === 10) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
    if (state.step == 2) {
      setState((prevState) => ({
        ...prevState,
        phoneNumber: e,
      }));
      if (val.length === 12) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
    if (state.step == 3) {
      setState((prevState) => ({
        ...prevState,
        verificationCode: e,
      }));
      if (val.length === 6) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  };
  console.log(state);

  const nextStep = () => {
    let currentStep = state.step;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;

    setState((prevState) => ({
      ...prevState,
      step: currentStep,
    }));
    setIsValid(false);
  };

  const prevStep = () => {
    let currentStep = state.step;
    currentStep = currentStep <= 0 ? 0 : currentStep - 1;

    setState((prevState) => ({
      ...prevState,
      step: currentStep,
    }));
    setIsValid(true);
  };

  const NextButton = () => {
    if (state.step < 2) {
      return (
        <TouchableOpacity
          onPress={nextStep}
          style={isValid ? styles.enabledButton : styles.disabledButton}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      );
    } else if (state.step == 2) {
      return (
        <TouchableOpacity
          style={isValid ? styles.enabledButton : styles.disabledButton}
          onPress={async () => {
            try {
              const formattedPhoneNo =
                "+1" + state.phoneNumber.replace(/ /g, "");
              setState((prevState) => ({
                ...prevState,
                formattedPhoneNo: formattedPhoneNo,
              }));
              auth
                .sendVerificationCode(formattedPhoneNo, recaptchaVerifier)
                .then((res) => {
                  if (res != undefined) {
                    setState((prevState) => ({
                      ...prevState,
                      verificationId: res,
                    }));
                    nextStep();
                  }
                });
            } catch (err) {}
          }}
        >
          <Text>Send Verification Code</Text>
        </TouchableOpacity>
      );
    } else if (state.step == 3) {
      return (
        <TouchableOpacity
          style={isValid ? styles.enabledButton : styles.disabledButton}
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
        <TouchableOpacity style={styles.enabledButton} onPress={prevStep}>
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
        attemptInvisibleVerification={true}
      />
      <NameScreen
        currentStep={state.step}
        styles={styles}
        handleChange={handleChange}
        name={state.name}
      />
      <DOBScreen
        currentStep={state.step}
        styles={styles}
        handleChange={handleChange}
        name={state.name.split(" ")[0]}
        formattedDOB={state.dob}
      />
      <PhoneNoScreen
        currentStep={state.step}
        styles={styles}
        handleChange={handleChange}
        formattedNo={state.phoneNumber}
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
      {state.step === 2 && <FirebaseRecaptchaBanner />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    width: 300,
    marginBottom: 20,
  },
  enabledButton: {
    alignItems: "center",
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  disabledButton: {
    alignItems: "center",
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    opacity: 0.3,
  },
  buttonText: {
    fontSize: 16,
  },
  input: {
    height: 75,
    width: 300,
    margin: 12,
    fontSize: 28,
  },
  header: {
    fontSize: 18,
  },
});
