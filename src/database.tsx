import * as firebase from 'firebase';
import { Database } from './interfaces'

const config = {
  apiKey: "AIzaSyDaBb-y1E-RB70QGIYnyz2xI_8ZDkhoC1c",
  authDomain: "reactlistwithfirebase.firebaseapp.com",
  databaseURL: "https://reactlistwithfirebase.firebaseio.com",
  messagingSenderId: "164262586929",
  projectId: "reactlistwithfirebase",
  storageBucket: "reactlistwithfirebase.appspot.com"
};
firebase.initializeApp(config);
export const base: Database = firebase.database();
export const storage: Database = firebase.storage();
