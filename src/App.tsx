import { useEffect, useState } from 'react'

import firebase from "firebase/app"
import "firebase/database"

function App() {
  const [db, setDb] = useState<any>(null)
  const [username, setUsername] = useState<string>("")

  const handleInputChange = (event: any) => {
    setUsername(event.target.value)
  }
  const createUser = () => {
    console.log('create new user', username)
  }

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
    dbRef.child("test").get().then((snapshot: any) => {
      if (snapshot.exists()) {
        console.log('get data success', snapshot.val())
      } else {
        console.log("No data available")
      }
    }).catch((error: Error) => {
      console.error(error)
    })
  })
  
  return (
    <div className="App">
      <input type="text" name="username" value={ username } onChange={ handleInputChange } />
      <button onClick={ createUser }>Create</button>
    </div>
  )
}

export default App
