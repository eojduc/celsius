import { TextInput, Text } from "react-native";

export function PhoneNoScreen({ currentStep, styles, handleChange }) {
  if (currentStep !== 2) {
    return null;
  }

  return (
    <>
      <Text>Create your account using your phone number</Text>
      <TextInput
        placeholder={"999 999 9999"}
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        style={styles.input}
        onChangeText={handleChange}
      />
    </>
  );
}
