import { useEffect, useState, ChangeEventHandler, ChangeEvent } from 'react'
import { db as firebaseDB } from '../services/firebase-client'

interface User {
  username: string,
  redemptionType: string,
  createDate: Date
}

export const HomePage = () => {
  const [username, setUsername] = useState("")
  const [redemptionType, setRedemptionType] = useState("")
  const [users, setUsers] = useState<User[]>([])

  const propsSetter: { [key: string]: ChangeEventHandler<HTMLInputElement> }= {
    "username": ((e: ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}),
    "redemptionType": ((e: ChangeEvent<HTMLInputElement>) => {setRedemptionType(e.target.value)}),
  }
  const createInputChangeHandler = (name: string): ChangeEventHandler<HTMLInputElement> => {
    const handleInputChange = propsSetter[name] || ((event: ChangeEvent<HTMLInputElement>) => {})

    return handleInputChange
  }
  const createUser = async () => {
    await firebaseDB.append('users', {
      username,
      redemptionType,
      createDate: new Date()
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
      <input type="text" name="username" value={ username } onChange={ createInputChangeHandler('username') } />
      <input type="text" name="redemptionType" value={ redemptionType } onChange={ createInputChangeHandler('redemptionType') } />
      <button onClick={ createUser }>Create</button>
      <ul>
        {
          users.map((user: User, idx: number) => (
            <li key={idx}>{ user.username } - { user.redemptionType }</li>
          )) 
        }
      </ul>
    </>
  )
}