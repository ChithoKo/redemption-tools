import { useEffect, useState } from 'react'

import firebase from "firebase/app"
import "firebase/database"
import { configs as firebaseConfigs } from './constants/firebase'

interface User {
  username: string
}
function App() {
  const [db, setDb] = useState<any>(null)
  const [username, setUsername] = useState<string>("")

  const handleInputChange = (event: any) => {
    setUsername(event.target.value)
  }
  const createUser = () => {
    db.ref('users').push({
      username: username
    })
  }
  const isFirebaseInitialized = (): boolean => firebase.apps.length !== 0

  useEffect(() => {
    if (!isFirebaseInitialized()) {
      firebase.initializeApp(firebaseConfigs)
    }
    const firebaseDB = firebase.database()
    setDb(firebaseDB)
  }, [])
  
  return (
    <div className="App">
      <input type="text" name="username" value={ username } onChange={ handleInputChange } />
      <button onClick={ createUser }>Create</button>
    </div>
  )
}

export default App
