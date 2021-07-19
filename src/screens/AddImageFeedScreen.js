import React, {useRef, useState} from 'react';
import {
   Button,
   Dimensions,
   Image,
   SafeAreaView,
   ScrollView,
   StyleSheet,
   Text,
   View,
 } from 'react-native';
import {
   launchCamera,
   launchImageLibrary,
 } from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import SignatureCapture from 'react-native-signature-capture';
import ViewShot from 'react-native-view-shot';
import store from '../store';
import { IMAGE_FEED } from "../constant/routes";
 
const AddImageFeed = ({navigation}) => {
  const { dispatch } = store;
  const settings = useSelector(state=> state.settings);

   const [imageUrl, setImageUrl] = useState('');
   const signaturePad = useRef(null);
   const viewShot = useRef(null);
 
   const handlePicture = (response) => {
     if (response.assets) {
       setImageUrl(response.assets[0].uri);
     }
   };
 
   const openCamera = () => {
     launchCamera(
       {
         includeBase64: true,
         mediaType: 'photo',
       },
       handlePicture,
     );
   };
 
   const openGallery = () => {
     launchImageLibrary(
       {
         includeBase64: true,
         mediaType: 'photo',
       },
       handlePicture,
     );
   };
 
   const reset = () => {
     signaturePad.current?.resetImage();
   };
 
   const save = () => {
     viewShot.current?.capture && viewShot.current?.capture();
   };
 
   const onCapture = (uri) => {
     if (settings){
      dispatch.imageFeed.addNewImage(uri);
      setImageUrl("");
      navigation.navigate(IMAGE_FEED)
     }
   };
 
   return (
     <SafeAreaView style={styles.container}>
       <ScrollView contentInsetAdjustmentBehavior="automatic" style={{flex: 1}}>
         {imageUrl ? (
           <View>
             <ViewShot
               onCapture={onCapture}
               ref={viewShot}
               options={{format: 'jpg', quality: 0.9}}>
               <View style={styles.imageView}>
                 <Image source={{uri: imageUrl}} style={styles.image} />
                 <SignatureCapture
                   style={styles.imagePad}
                   ref={signaturePad}
                   saveImageFileInExtStorage={false}
                   showNativeButtons={false}
                   showTitleLabel={false}
                   viewMode={'portrait'}
                   showBorder={false}
                   backgroundColor="transparent"
                 />
               </View>
             </ViewShot>
             <View style={[styles.buttons, {marginTop: 10}]}>
               <View style={styles.button}>
                 <Button title="Reset" onPress={reset} />
               </View>
               <View style={styles.button}>
                 <Button title="Upload" onPress={save} />
               </View>
             </View>
           </View>
         ) : null}
         <Text style={styles.text}>Take a picture</Text>
         <View style={styles.buttons}>
           <View style={styles.button}>
             <Button title="Select Picture" onPress={openCamera} />
           </View>
           <View style={styles.button}>
             <Button title="Take picture" onPress={openGallery} />
           </View>
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     paddingTop: 20,
   },
   imageView: {
     width: Dimensions.get('window').width - 100,
     alignSelf: 'center',
   },
   text: {
     textAlign: 'center',
     fontSize: 18,
     marginTop: 20,
   },
   image: {
     width: undefined,
     height: undefined,
     aspectRatio: 1,
   },
   buttons: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 20,
   },
   button: {
     marginHorizontal: 5,
   },
   imagePad: {
     top: 0,
     right: 0,
     left: 0,
     bottom: 0,
     position: 'absolute',
   },
 });
 
 export default AddImageFeed;
 