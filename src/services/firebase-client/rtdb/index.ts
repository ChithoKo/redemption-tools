import firebase from "firebase/app"
import "firebase/database"
import { configs as firebaseConfigs } from '../../../constants/firebase'

const isFirebaseInitialized = (): boolean => !!firebase.apps.length

if (!isFirebaseInitialized()) {
  firebase.initializeApp(firebaseConfigs)
}

const db = firebase.database()


export const create = async (key: string, value: any) => {
  const error = await db.ref(key).set(value)

  if (error) {
    console.error('Data could not be saved')
    console.error(error)
  }
}

export const append = (key: string, value: any) => {
  db.ref(key).push(value)
}


export const get = async (key: string) => {
  let result = null

  try {
    const snapshot = await db.ref(key).get()
    result = snapshot.exists() ? snapshot.val() : null
  } catch (error) {
    console.error('Data could not be retrieved')
    console.error(error)
  }
  
  return result
}

export const list = async (key: string): Promise<any[]> => {
  let result = null

  result = await get(key)
  result = result ? Object.values(result) : []

  return result
}
