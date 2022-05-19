import { StyleSheet, View, Dimensions, Button, ScrollView, Text } from "react-native";
import { useRef, useState, useEffect } from "react";
import PreviewPost from "./PreviewPost";
import OpenPost from "./OpenPost";
import { Modalize } from "react-native-modalize";
import { collectionGroup, query, onSnapshot } from "firebase/firestore";
import { firestore } from "../lib/firebase";

const PostPage = ({ color }) => {
  const [openPost, setOpenPost] = useState({});
  const [posts, setPosts] = useState([]);
  const modalizeRef = useRef(null);
  const { width } = Dimensions.get("window");

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
  const headerColor = (color) => {
    switch (color) {
      case 'red':
        return 'darksalmon';
      case 'blue':
        return 'lightblue';
      case 'green':
        return 'lightgreen';
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    content: {
      backgroundColor: color,
      justifyContent: "center",
      width: width,
      flex: 6,
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: headerColor(color),
      text: {
        textAlign: 'center',
      }
    }

    
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header.text}>HEADER</Text>
      </View>
      <View key={color.toString()} style={styles.content}>
        <Modalize ref={modalizeRef} modalTopOffset={60}>
          <OpenPost color={color} data={openPost} close={closeModal} />
        </Modalize>
        <ScrollView vertical>
          {posts.map((post) => (
            <PreviewPost data={post} onPress={openModal} />
          ))}
        </ScrollView>
        <Button title="make post" onPress={() => setModal(true)} />
      </View>      
    </View>

  );
};
export default PostPage;
