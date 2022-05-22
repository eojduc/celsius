import { TextInput, Text } from "react-native";

export function PhoneNoVerifScreen({ currentStep, styles, handleChange }) {
  if (currentStep !== 3) {
    return null;
  }

  return (
    <>
      <Text>Verify your Phone Number</Text>
      <TextInput
        placeholder={"123456"}
        style={styles.input}
        onChangeText={handleChange}
      />
    </>
  );
}
