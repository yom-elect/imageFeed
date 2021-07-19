import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import store from '../store';
import { Image, View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text, Layout, List } from '@ui-kitten/components'

// const DATA = [
//     {
//       key: 1,
//       imageURI:
//         'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
//     },
//     {
//       key: 2,
//       imageURI:
//         'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
//     }
// ]

const ImageFeedScreen = () => {
  const { dispatch } = store; //Rematch dispatch actions 
  const { imageArr, loading } = useSelector(state=> state.imageFeed);

  useEffect(() => {
    dispatch.imageFeed.getAllImage();
  }, [dispatch]);

  const renderItem = ({ item }) => (
      <View style={styles.card}>
        <Image
          source={{ uri: item.url }}
          style={styles.cardImage}
        />
      </View>
  );
  
  // If No Image  emptylist message is rendered
  const renderEmptyList = () =>
   (
    <View style={styles.cardHeader}>
    <Text category='s1' style={styles.cardTitle}>
        No Image Uploaded
    </Text>
  </View>
    );

    if (loading) {
      return (
        <View style ={styles.preloader}>
            <ActivityIndicator size = "large" color="#9E9E9E"/>
        </View>
      );
    }
    return (
    <Layout style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 5,
          borderBottomWidth: StyleSheet.hairlineWidth,
          alignItems: 'center'
        }}>
        <Text style={{ fontSize: 20 }}>All Images 🔥</Text>
      </View>
      <List
        style={styles.container}
        data={imageArr}
        renderItem={renderItem}
        keyExtractor={imageArr.key}
        ListEmptyComponent={renderEmptyList}
      />
    </Layout>
    );
}

export default ImageFeedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      card: {
        backgroundColor: "#fff",
        marginBottom: 25
      },
      cardImage: {
        width: '100%',
        height: 300
      },
      cardHeader: {
        padding: 10,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      cardTitle: {
        color: "#000"
      },
      preloader: {
        left: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
      }
  });