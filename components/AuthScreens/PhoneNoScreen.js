import { TextInput, Text } from "react-native";

export function PhoneNoScreen({ currentStep, styles, handleChange }) {
  if (currentStep !== 2) {
    return null;
  }

  return (
    <>
      <Text>Create your account using your phone number</Text>
      <TextInput
        placeholder={"Your Phone"}
        style={styles.input}
        onChangeText={handleChange}
      />
    </>
  );
}
