import firebase from '../../../database/firebaseDb';
import Snackbar from 'react-native-snackbar';

const dbRef = firebase.firestore().collection('images-feed');

export const imageFeed = {
    state: {
        imageArr: [],
        loading: true,
        errorMessage: null
    },
    reducers: {
        actionLoading(state){
                return {
                    ...state,
                    loading: true
                }
        },
        actionFailure (state,payload){
            return {...state, loading: false, errorMessage: payload.message}
        },
        actionGetSuccess (state, payload){
            return {
                ...state,
                imageArr: payload,
                loading: false,
            }
        },
        actionUploadSuccess (state, __payload){
            return {
                ...state,
                loading: false
            }
        }
    },
    effects: (dispatch) => ({
        async addNewImage(uri, rootState) {
          const isConnected = rootState.settings;
          if(isConnected){
              try {
                dispatch.imageFeed.actionLoading();
                const response = await  dbRef.add({
                    url: uri
                })
                if (response){
                    dispatch.imageFeed.actionUploadSuccess()
                }else {
                    const message = data?.message || "Couldn't upload Image";
                    dispatch.imageFeed.actionFailure({message});
                    Snackbar.show({
                        text: message,
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                          text: 'UNDO',
                          textColor: 'red',
                          onPress: () => { /* Do something. */ },
                        },
                      });
                }
              } catch (e) {
                let message = '';
                if (e.response) {
                message = e.response;
                } else if (e.request) {
                message = 'Network Error, Please try again';
                } else {
                message = "Couldn't upload Image";
                }
                dispatch.imageFeed.actionFailure({message});
              }
          }
        },
        async getAllImage(__payload, rootState){
            const isConnected = rootState.settings;
          if(isConnected){
              try{
                dispatch.imageFeed.actionLoading();
                dbRef.onSnapshot((querySnapshot)=>{
                    const imageArr = [];
                    querySnapshot.forEach((res) => {
                        const  {url} = res.data();
                        imageArr.push({
                            key: res.id,
                            url,
                        })
                    });
                    dispatch.imageFeed.actionGetSuccess(imageArr)
                })
              }catch(e){
                let message = '';
                if (e.response) {
                message = e.response;
                } else if (e.request) {
                message = 'Network Error, Please try again';
                } else {
                message = "Couldn't get Images";
                }
                dispatch.imageFeed.actionFailure({message});
              }
          }
        }
      }),
}