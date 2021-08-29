import { useEffect, useState } from 'react'
import { db as firebaseDB } from '../services/firebase-client'

interface User {
  username: string
}

export const HomePage = () => {
  const [username, setUsername] = useState<string>("")
  const [users, setUsers] = useState<User[]>([])

  const handleInputChange = (event: any) => {
    setUsername(event.target.value)
  }
  const createUser = async () => {
    await firebaseDB.append('users', {
      username: username
    })

    fetchUsers()
  }
  const fetchUsers = async () => {
    const users = await firebaseDB.list('users')
    setUsers(users)
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  

  return (
    <>
      <input type="text" name="username" value={ username } onChange={ handleInputChange } />
      <button onClick={ createUser }>Create</button>
      <ul>
        {
          users.map((user: User, idx: number) => (
            <li key={idx}>{ user.username }</li>
          )) 
        }
      </ul>
    </>
  )
}