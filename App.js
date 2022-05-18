import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import PostPage from './components/PostPage';
export default function App() {
  const { width } = Dimensions.get('window');
  return (
      <ScrollView pagingEnabled decelerationRate='fast' horizontal>
          {colors.map(color => <PostPage color={color} />)}
      </ScrollView>
    
  );
  
}
const colors = [
  'blue',
  'red',
  'green',
  'purple',
  'yellow'
]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
