import { Text } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export function DOBScreen({
  currentStep,
  styles,
  handleChange,
  name,
  formattedDOB,
}) {
  if (currentStep !== 1) {
    return null;
  }

  return (
    <>
      <Text style={styles.header}>Hi {name}! What's your date of birth</Text>
      <TextInputMask
        type={"datetime"}
        options={{
          format: "DD MM YYYY",
        }}
        placeholder={"MM DD YYYY"}
        style={styles.input}
        onChangeText={handleChange}
        keyboardType="numeric"
        contextMenuHidden={true}
        value={formattedDOB}
        maxLength={10}
      />
    </>
  );
}
