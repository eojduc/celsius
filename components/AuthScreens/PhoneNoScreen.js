import { Text } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export function PhoneNoScreen({ currentStep, styles, handleChange, formattedNo }) {
  if (currentStep !== 2) {
    return null;
  }

  return (
    <>
      <Text style={styles.header}>
        Create your account using your phone number
      </Text>
      <TextInputMask
        type={"custom"}
        options={{
          mask: "999 999 9999",
        }}
        placeholder={"Your Phone Number"}
        autoCompleteType="tel"
        keyboardType="numeric"
        textContentType="telephoneNumber"
        style={styles.input}
        value={formattedNo}
        onChangeText={handleChange}
      />
    </>
  );
}
