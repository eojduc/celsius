import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
const PreviewPost = ({ data, onPress }) => {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
  };
  const openPage = ({}) => {
    onPress(data);
  };

  return (
    <View style={styles}>
      <TouchableOpacity onPress={openPage}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.content}>@{data.username}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLike}>
        <Text>{liked ? "unlike" : "like"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundColor: "#8AE1E2",
  borderWidth: 2,
  margin: 10,
  title: {
    fontSize: 40,
  },
  content: {
    fontSize: 20,
  },
  button: {
    backgroundColor: "red",
  },
});
export default PreviewPost;
