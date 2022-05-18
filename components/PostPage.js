import { StyleSheet, View, Text, Dimensions, Button, ScrollView, Modal} from "react-native";
import {useRef, useState} from 'react';
import PreviewPost from "./PreviewPost";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OpenPost from "./OpenPost";
import { Modalize } from "react-native-modalize";

const PostPage = ({color}) => {
  const [openPost, setOpenPost] = useState({});
  const [modal, setModal] = useState(false);
  const {width} = Dimensions.get('window');
  const modalizeRef = useRef(null);
  const closeModal = () => {
    modalizeRef.current.close();
  }
  const openModal = (data) => {
    setOpenPost(data);
    modalizeRef.current.open();
  }
  const styles = StyleSheet.create({
    backgroundColor: color,
    justifyContent: 'center',
    width: width,
    flex: 5
  });
  const posts = [{
    title: 'POST TITLE 1',
    body: 'POST BODY'
  }, {
    title: 'POST TITLE 2',
    body: 'POST BODY'
  }, {
    title: 'POST TITLE 3',
    body: 'POST BODY'
  }, {
    title: 'POST TITLE 4',
    body: 'POST BODY'
  }];

  return (
    <View key={color.toString()} style={styles} >
      <Modalize ref={modalizeRef}>
        <OpenPost color={color} data={openPost} close={closeModal} />
      </Modalize>
      <ScrollView vertical>
        {posts.map(post => <PreviewPost data={post} onPress={openModal}/>)}
      </ScrollView>
      <Button title='make post' onPress={()=>setModal(true)}/>
    </View>
  )
}
export default PostPage;