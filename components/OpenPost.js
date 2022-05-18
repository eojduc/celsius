import {View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

const OpenPost = ({data, color, close}) => {
  const [liked, setLiked] = useState(false);
  const toggleLiked = () => setLiked(!liked)
  const styles = StyleSheet.create({
    backgroundColor: color,
    justifyContent: 'center',
    flex: 1,
    title: {
      fontSize: 40
    },
    comments: {
      borderTop: 2,
    }
  })
  return (
    <View style={styles}>
      <Button onPress={close} title='close'/>
      <Text style={styles.title}>{data.title}</Text>
      <Text>{data.body}</Text>
      <TouchableOpacity style={styles.button} onPress={toggleLiked}>
        <Text>{liked ? 'unlike':'like'}</Text>
      </TouchableOpacity>
      <View>
        <Text>Comments Go Here</Text>
      </View>
    </View>
    
  )
}
export default OpenPost;