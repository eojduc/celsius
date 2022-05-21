import { StyleSheet, View, Dimensions, Button, ScrollView } from "react-native";
import { useRef, useState, useEffect } from "react";
import PreviewPost from "./PreviewPost";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OpenPost from "./OpenPost";
import { Modalize } from "react-native-modalize";
import { collectionGroup, query, onSnapshot } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useAuth } from "../lib/hooks";

const PostPage = ({ color }) => {
  const [openPost, setOpenPost] = useState({});
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const modalizeRef = useRef(null);
  const { width } = Dimensions.get("window");
  const auth = useAuth();

  const closeModal = () => {
    modalizeRef.current.close();
  };
  const openModal = (data) => {
    setOpenPost(data);
    modalizeRef.current.open();
  };

  useEffect(() => {
    const q = query(collectionGroup(firestore, "posts"));
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });

    return unsub;
  }, []);

  const styles = StyleSheet.create({
    backgroundColor: color,
    justifyContent: "center",
    width: width,
    flex: 5,
    paddingTop: 40,
  });

  return (
    <View key={color.toString()} style={styles}>
      <Modalize ref={modalizeRef}>
        <OpenPost color={color} data={openPost} close={closeModal} />
      </Modalize>
      <ScrollView vertical>
        {posts.map((post) => (
          <PreviewPost data={post} key={post.title} onPress={openModal} />
        ))}
      </ScrollView>
      <Button title="make post" onPress={() => setModal(true)} />
      <Button title="logout" onPress={() => auth.signout()} />
    </View>
  );
};
export default PostPage;
