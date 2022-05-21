import { View, Text, TouchableOpacity, StyleSheet, Button, Dimensions } from "react-native";
import { useState } from "react";

const OpenPost = ({ data, color }) => {
  const { height } = Dimensions.get('window');
  const [liked, setLiked] = useState(false);
  const toggleLiked = () => setLiked(!liked);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color,
      justifyContent: "top",
      flex: 1,
      height: height,    
    },
    title: {
      fontSize: 40,
    },
    comments: {
      borderTop: 2,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.content}>@{data.username}</Text>
      <Text style={styles.content}>{data.content}</Text>
      <TouchableOpacity style={styles.button} onPress={toggleLiked}>
        <Text>{liked ? "unlike" : "like"}</Text>
      </TouchableOpacity>
      <View>
        <Text>Comments Go Here</Text>
      </View>
    </View>
  );
};
export default OpenPost;
