import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import firebase from "firebase/app"
import "firebase/database"

function App() {
  const [db, setDb] = useState<any>(null)
  const [username, setUsername] = useState<string>("")

  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  }

  const handleInputChange = (event: any) => {
    setUsername(event.target.value)
  }
  const createUser = () => {
    console.log('create new user', username)
    db.ref('users').set({
      1: {
        username: username
      }
    })
  }

  useEffect(() => {
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
