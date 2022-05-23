import { Text, View, StyleSheet } from "react-native";

export function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Celsius</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32
  }
});
