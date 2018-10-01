import firebase from 'firebase';
import 'firebase/firestore';
import { apiKey, authDomain, databaseURL, messagingSenderId, projectId, storageBucket } from '@/firebaseConfig';

// Initialize Firebase
export const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true,
};
db.settings(settings);

// firebase collections
const commentsCollection = db.collection('comments');
const featuresCollection = db.collection('features');
const itemsCollection = db.collection('items');
const linksCollection = db.collection('links');
const projectsCollection = db.collection('projects');
const usersCollection = db.collection('users');

export {
  db,
  auth,
  commentsCollection,
  currentUser,
  featuresCollection,
  itemsCollection,
  linksCollection,
  projectsCollection,
  usersCollection,
};
