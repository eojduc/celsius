import { ScrollView } from "react-native";
import PostPage from "./PostPage";

export function HomeScreen() {
  return (
    <ScrollView pagingEnabled decelerationRate="fast" horizontal>
      {colors.map((color) => (
        <PostPage color={color} key={color} />
      ))}
    </ScrollView>
  );
}

const colors = ["blue", "red", "green"];
