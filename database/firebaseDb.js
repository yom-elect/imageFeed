// database/firebaseDb.js
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBkYcrGrIG0_OzSMr-3PYOhDX_vBdmThmA",
    authDomain: "social-app-ac019.firebaseapp.com",
    databaseURL: "https://social-app-ac019.firebaseio.com",
    projectId: "social-app-ac019",
    storageBucket: "social-app-ac019.appspot.com",
    messagingSenderId: "1021362559615",
    appId: "1:1021362559615:web:ebd8090b4945b86f083d4a"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

export default firebase;