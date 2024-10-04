// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlqvr9r2QZuOFuSr-4670igu3RbNAn40M",
  authDomain: "hexagonalchess-5ec7b.firebaseapp.com",
  databaseURL: "https://hexagonalchess-5ec7b-default-rtdb.firebaseio.com",
  projectId: "hexagonalchess-5ec7b",
  storageBucket: "hexagonalchess-5ec7b.appspot.com",
  messagingSenderId: "32716051328",
  appId: "1:32716051328:web:1f3b874dd8bd3971e1a765",
  measurementId: "G-B0B45QLR6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  
  // Call the function to fetch data
  fetchData();