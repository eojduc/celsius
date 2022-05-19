import { StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native";
import PostPage from "./components/PostPage";
export default function App() {
  return (
    <ScrollView pagingEnabled decelerationRate="fast" horizontal>
      {colors.map((color) => (
        <PostPage color={color} />
      ))}
    </ScrollView>
  );
}
const colors = ["blue", "red", "green"];
