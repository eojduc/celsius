import { TextInput, Text } from "react-native";

export function NameScreen({ currentStep, styles, handleChange }) {
  if (currentStep !== 0) {
    return null;
  }

  return (
    <>
      <Text>Let's get started, what's your full name?</Text>
      <TextInput
        placeholder={"Your Full Name"}
        style={styles.input}
        onChangeText={handleChange}
      />
    </>
  );
}
