import { db as firebaseDB } from "../services/firebase-client";
import { useEffect, useState } from "react";
import { RegistrationForm } from '../components/RegistrationForm'

interface User {
  username: string;
  redemptionType: string;
  redemptionCode: string;
  createDate: Date;
}

export const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const users = await firebaseDB.list("users");
    setUsers(users);
  };
  const onRegistrationDone = () => { fetchUsers(); }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <RegistrationForm onRegistrationDone={ onRegistrationDone } />
      <h2>Registration list</h2>
      <ul>
        {users.map((user: User, idx: number) => (
          <li key={idx}>
            {user.username} - {user.redemptionType}
          </li>
        ))}
      </ul>
    </>
  )
}