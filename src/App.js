import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import firebase from "firebase/app"
import "firebase/database"

function App() {
  const [db, setDb] = useState(null)

  useEffect(() => {
    const config = {
      apiKey: "AIzaSyDOgifivnGB0p7YWUPsuXKaad6UNvgYGZo",
      authDomain: "redemption-tools.firebaseapp.com",
      databaseURL: "https://redemption-tools-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "redemption-tools",
      storageBucket: "redemption-tools.appspot.com",
      messagingSenderId: "320014175119",
      appId: "1:320014175119:web:3c243ab8f94213d7c319fa",
      measurementId: "G-KS5T9XH709"
    }

    firebase.initializeApp(config)
    const db = firebase.database()
    setDb(db)
  }, [])

  useEffect(() => {
    if (!db) return

    const dbRef = db.ref()
    dbRef.child("test").get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log('get data success', snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
