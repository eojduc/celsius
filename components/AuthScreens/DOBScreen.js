import { TextInput, Text } from "react-native";

export function DOBScreen({ currentStep, styles, handleChange }) {
  if (currentStep !== 1) {
    return null;
  }

  return (
    <>
      <Text>Hi name! What's your date of birth</Text>
      <TextInput
        placeholder={"MM DD YYYY"}
        style={styles.input}
        onChangeText={handleChange}
      />
    </>
  );
}
