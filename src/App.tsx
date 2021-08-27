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
  const [users, setUsers] = useState<User[]>([])

  const handleInputChange = (event: any) => {
    setUsername(event.target.value)
  }
  const createUser = () => {
    db.ref('users').push({
      username: username
    })
  }
  const getUsersFromDB = async () => {
    const dbRef = db.ref()
    const users = await dbRef.child("users").get().then((snapshot: any) => {
      if (snapshot.exists()) {
        const users = snapshot.val()
        return Object.values(users)
      } else {
        return []
      }
    }).catch((error: Error) => {
      console.error(error)
      return []
    })

    return users
  }
  const fetchUsersFrom = async (db: any) => {
    if (!db) { return }
    
    const users = await getUsersFromDB()
    setUsers(users)
  }
  const isFirebaseInitialized = (): boolean => firebase.apps.length !== 0

  useEffect(() => {
    if (!isFirebaseInitialized()) {
      firebase.initializeApp(firebaseConfigs)
    }
    const firebaseDB = firebase.database()
    setDb(firebaseDB)
  }, [])
  useEffect(() => {
    fetchUsersFrom(db)
  }, [db])
  

  return (
    <div className="App">
      <input type="text" name="username" value={ username } onChange={ handleInputChange } />
      <button onClick={ createUser }>Create</button>
      <ul>
        {
          users.map((user: User) => (
            <li>{ user.username }</li>
          )) 
        }
      </ul>
    </div>
  )
}

export default App
